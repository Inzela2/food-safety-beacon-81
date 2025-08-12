import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TASK_TEMPLATES } from "@/data/taskTemplates";
import type { Report, Section, Shift, TaskInstance, TaskStatus, TaskTemplate } from "@/types/runbook";
import { v4 as uuidv4 } from "uuid";
import { generateShiftPdf, generateInspectorPackPdf } from "@/lib/pdf";

// Simple UUID fallback if uuid is not installed
function uid() {
  try {
    return uuidv4();
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

// Storage keys
const LS_CURRENT_SHIFT_ID = "runbook:currentShiftId";
const LS_SHIFTS = "runbook:shifts";
const LS_REPORTS = "runbook:reports";

// Helpers
const nowIso = () => new Date().toISOString();
const addMinutes = (d: Date, mins: number) => new Date(d.getTime() + mins * 60000);

function nextDueAt(template: TaskTemplate, from: Date, overrides?: Record<string, number>): string {
  const lower = template.freq.toLowerCase();
  const overrideMin = overrides?.[template.id];
  if (overrideMin) return addMinutes(from, overrideMin).toISOString();
  if (lower.includes("shift start")) return from.toISOString();
  if (lower.includes("hourly")) return addMinutes(from, 60).toISOString();
  if (lower.includes("every 2")) return addMinutes(from, 120).toISOString();
  if (lower.includes("mid-shift")) return addMinutes(from, 240).toISOString();
  if (lower.includes("closing")) return addMinutes(from, 8 * 60).toISOString(); // placeholder end of day
  // manual/triggered tasks - schedule now
  return from.toISOString();
}

// Parse common numeric limits like "≤ 5 °C", ">= 60", "≈ 82"
function evaluateLimit(limitText: string | undefined, value: number): { pass: boolean; rule?: string } {
  if (!limitText) return { pass: true };
  const text = limitText.replace(/\s/g, "");
  const approxMatch = text.match(/[≈~=](-?\d+(?:\.\d+)?)/);
  if (approxMatch) {
    const target = parseFloat(approxMatch[1]);
    const pass = Math.abs(value - target) <= 3; // ±3°C tolerance
    return { pass, rule: `≈ ${target}` };
  }
  const leMatch = text.match(/[≤<=](-?\d+(?:\.\d+)?)/);
  if (leMatch) {
    const target = parseFloat(leMatch[1]);
    return { pass: value <= target, rule: `≤ ${target}` };
  }
  const geMatch = text.match(/[≥>=](-?\d+(?:\.\d+)?)/);
  if (geMatch) {
    const target = parseFloat(geMatch[1]);
    return { pass: value >= target, rule: `≥ ${target}` };
  }
  return { pass: true };
}

export interface RunbookContextValue {
  templates: TaskTemplate[];
  currentShift: Shift | null;
  instances: TaskInstance[];
  reports: Report[];
  startShift: (managerName: string) => void;
  completeInstance: (
    instanceId: string,
    payload: { value?: number; photoDataUrl?: string; notes?: string; compliant?: boolean; corrective_action?: string }
  ) => void;
  scheduleNextForTemplate: (templateId: string) => void;
  closeShift: () => Promise<Report | null>;
  inspectorPack: () => Promise<Blob | null>;
}

const RunbookContext = createContext<RunbookContextValue | undefined>(undefined);

export const RunbookProvider = ({ children }: { children: React.ReactNode }) => {
  const [templates] = useState<TaskTemplate[]>(TASK_TEMPLATES);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);
  const [instances, setInstances] = useState<TaskInstance[]>([]);
  const [reports, setReports] = useState<Report[]>(() => {
    const raw = localStorage.getItem(LS_REPORTS);
    return raw ? JSON.parse(raw) : [];
  });
  const [overrides, setOverrides] = useState<Record<string, number>>({}); // templateId -> minutes
  const [consecutiveFails, setConsecutiveFails] = useState<Record<string, number>>({});

  // Restore current shift
  useEffect(() => {
    const curId = localStorage.getItem(LS_CURRENT_SHIFT_ID);
    const shifts: Shift[] = JSON.parse(localStorage.getItem(LS_SHIFTS) || "[]");
    if (curId) {
      const s = shifts.find((x) => x.id === curId) || null;
      setCurrentShift(s);
      if (s) {
        const rawInst = localStorage.getItem(`runbook:instances:${s.id}`);
        setInstances(rawInst ? JSON.parse(rawInst) : []);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_REPORTS, JSON.stringify(reports));
  }, [reports]);

  const persistInstances = useCallback(
    (shiftId: string, next: TaskInstance[]) => {
      setInstances(next);
      localStorage.setItem(`runbook:instances:${shiftId}`, JSON.stringify(next));
    },
    []
  );

  const startShift = useCallback((managerName: string) => {
    const shift: Shift = {
      id: uid(),
      date: new Date().toISOString().slice(0, 10),
      opened_at: nowIso(),
      manager_name: managerName,
      closed_at: null,
    };
    const shifts: Shift[] = JSON.parse(localStorage.getItem(LS_SHIFTS) || "[]");
    shifts.push(shift);
    localStorage.setItem(LS_SHIFTS, JSON.stringify(shifts));
    localStorage.setItem(LS_CURRENT_SHIFT_ID, shift.id);
    setCurrentShift(shift);

    // Seed initial instances
    const seed: TaskInstance[] = [];
    const base = new Date(shift.opened_at);
    templates.forEach((t) => {
      // Opening due now
      if (t.section === "Opening") {
        seed.push({
          id: uid(),
          template_id: t.id,
          due_at: nextDueAt(t, base, overrides),
          status: "Pending",
          fail_count: 0,
        });
      }
      // Service recurring - schedule first occurrence
      if (t.section === "Service" && /hour|every|mid-shift/i.test(t.freq)) {
        seed.push({
          id: uid(),
          template_id: t.id,
          due_at: nextDueAt(t, base, overrides),
          status: "Pending",
          fail_count: 0,
        });
      }
      // Closing - schedule end of day placeholder
      if (t.section === "Closing") {
        seed.push({
          id: uid(),
          template_id: t.id,
          due_at: nextDueAt(t, base, overrides),
          status: "Pending",
          fail_count: 0,
        });
      }
    });
    persistInstances(shift.id, seed);
  }, [templates, overrides, persistInstances]);

  const scheduleNextForTemplate = useCallback(
    (templateId: string) => {
      if (!currentShift) return;
      const t = templates.find((x) => x.id === templateId);
      if (!t) return;
      const next: TaskInstance = {
        id: uid(),
        template_id: t.id,
        due_at: nextDueAt(t, new Date(), overrides),
        status: "Pending",
        fail_count: 0,
      };
      const merged = [...instances, next];
      persistInstances(currentShift.id, merged);
    },
    [currentShift, templates, instances, overrides, persistInstances]
  );

  const completeInstance: RunbookContextValue["completeInstance"] = useCallback(
    (instanceId, payload) => {
      if (!currentShift) return;
      const inst = instances.find((i) => i.id === instanceId);
      if (!inst) return;
      const template = templates.find((t) => t.id === inst.template_id);
      if (!template) return;

      let status: TaskStatus = "Compliant";
      let failed = false;

      // Validate numeric limits if present
      if (template.proof_type.includes("value") && typeof payload.value === "number") {
        const { pass } = evaluateLimit(template.limit_text, payload.value);
        if (!pass) {
          status = "Non-Compliant";
          failed = true;
        }
      }

      if (payload.compliant === false) {
        status = "Non-Compliant";
        failed = true;
      }

      const updated: TaskInstance = {
        ...inst,
        status,
        value: payload.value ?? inst.value,
        photo_url: payload.photoDataUrl ?? inst.photo_url,
        notes: payload.notes ?? inst.notes,
        corrective_action: payload.corrective_action ?? inst.corrective_action,
        completed_at: nowIso(),
      };

      // Update fail counters and auto-escalation
      let newFails = { ...consecutiveFails };
      let newOverrides = { ...overrides };
      if (failed) {
        newFails[template.id] = (newFails[template.id] || 0) + 1;
        if (newFails[template.id] >= 2) {
          // Escalate frequency (halve interval if known)
          const base = template.freq.toLowerCase().includes("every 2") ? 120 : template.freq.toLowerCase().includes("hourly") ? 60 : null;
          if (base) newOverrides[template.id] = Math.max(30, Math.floor(base / 2));
        }
      } else {
        // reset on pass and reduce overrides after 3 passes
        newFails[template.id] = 0;
        if (overrides[template.id]) {
          // Keep override until 3 compliant passes – track via inst.fail_count reused as pass streak
          const passStreak = (inst.fail_count || 0) + 1;
          updated.fail_count = passStreak;
          if (passStreak >= 3) {
            delete newOverrides[template.id];
          }
        }
      }

      const replaced = instances.map((i) => (i.id === inst.id ? updated : i));

      // Schedule next if recurring
      const recurring = /hour|every|mid-shift|delivery|batch|closing/i.test(template.freq);
      let merged = replaced;
      if (recurring) {
        merged = [
          ...replaced,
          {
            id: uid(),
            template_id: template.id,
            due_at: nextDueAt(template, new Date(), newOverrides),
            status: "Pending",
            fail_count: failed ? (inst.fail_count || 0) + 1 : 0,
          },
        ];
      }

      setConsecutiveFails(newFails);
      setOverrides(newOverrides);
      persistInstances(currentShift.id, merged);
    },
    [currentShift, instances, templates, overrides, consecutiveFails, persistInstances]
  );

  const closeShift = useCallback(async (): Promise<Report | null> => {
    if (!currentShift) return null;
    // mark shift closed
    const shifts: Shift[] = JSON.parse(localStorage.getItem(LS_SHIFTS) || "[]");
    const idx = shifts.findIndex((s) => s.id === currentShift.id);
    const closedAt = nowIso();
    if (idx >= 0) {
      shifts[idx] = { ...shifts[idx], closed_at: closedAt };
      localStorage.setItem(LS_SHIFTS, JSON.stringify(shifts));
    }
    setCurrentShift({ ...currentShift, closed_at: closedAt });

    // Generate PDF
    const blob = await generateShiftPdf(currentShift, instances, templates);
    const url = URL.createObjectURL(blob);
    const report: Report = {
      id: uid(),
      shift_id: currentShift.id,
      pdf_url: url,
      created_at: nowIso(),
    };
    const nextReports = [...reports, report];
    setReports(nextReports);
    localStorage.setItem(LS_REPORTS, JSON.stringify(nextReports));
    localStorage.removeItem(LS_CURRENT_SHIFT_ID);
    return report;
  }, [currentShift, instances, templates, reports]);

  const inspectorPack = useCallback(async (): Promise<Blob | null> => {
    const now = new Date();
    const since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    // Gather instances across stored shifts in last 30 days
    const shifts: Shift[] = JSON.parse(localStorage.getItem(LS_SHIFTS) || "[]");
    const relevantShiftIds = shifts.filter((s) => new Date(s.date) >= since).map((s) => s.id);
    let all: TaskInstance[] = [];
    relevantShiftIds.forEach((id) => {
      const raw = localStorage.getItem(`runbook:instances:${id}`);
      if (raw) all = all.concat(JSON.parse(raw));
    });
    if (!all.length) return null;
    return generateInspectorPackPdf(all, templates);
  }, []);

  const value = useMemo<RunbookContextValue>(
    () => ({
      templates,
      currentShift,
      instances,
      reports,
      startShift,
      completeInstance,
      scheduleNextForTemplate,
      closeShift,
      inspectorPack,
    }),
    [templates, currentShift, instances, reports, startShift, completeInstance, scheduleNextForTemplate, closeShift, inspectorPack]
  );

  return <RunbookContext.Provider value={value}>{children}</RunbookContext.Provider>;
};

export const useRunbook = () => {
  const ctx = useContext(RunbookContext);
  if (!ctx) throw new Error("useRunbook must be used within RunbookProvider");
  return ctx;
};
