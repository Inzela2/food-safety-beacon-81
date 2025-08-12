import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Shift, TaskInstance, TaskTemplate } from "@/types/runbook";

export async function generateShiftPdf(
  shift: Shift,
  instances: TaskInstance[],
  templates: TaskTemplate[]
): Promise<Blob> {
  const doc = new jsPDF();
  const title = `Daily Log – ${shift.date}`;
  doc.setFontSize(16);
  doc.text(title, 14, 16);
  doc.setFontSize(10);
  doc.text(`Manager: ${shift.manager_name}`, 14, 22);
  doc.text(`Opened: ${new Date(shift.opened_at).toLocaleString()}`, 14, 28);
  if (shift.closed_at) doc.text(`Closed: ${new Date(shift.closed_at).toLocaleString()}`, 14, 34);

  const rows = instances
    .filter((i) => i.completed_at)
    .sort((a, b) => (a.completed_at! > b.completed_at! ? 1 : -1))
    .map((i) => {
      const t = templates.find((t) => t.id === i.template_id);
      return [
        t?.section || "-",
        t?.title || i.template_id,
        t?.legal_ref || "-",
        t?.limit_text || "-",
        i.value ?? "",
        i.status,
        new Date(i.completed_at!).toLocaleTimeString(),
      ];
    });

  autoTable(doc, {
    head: [["Section", "Task", "Legal Ref", "Limit", "Value", "Status", "Time"]],
    body: rows,
    startY: 40,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [13, 110, 253] },
  });

  const blob = doc.output("blob");
  return blob;
}

export async function generateInspectorPackPdf(
  instances: TaskInstance[],
  templates: TaskTemplate[]
): Promise<Blob> {
  const doc = new jsPDF();
  const title = `Inspector Pack – Last 30 Days`;
  doc.setFontSize(16);
  doc.text(title, 14, 16);

  const bySection: Record<string, TaskInstance[]> = {};
  instances.forEach((i) => {
    const t = templates.find((t) => t.id === i.template_id);
    const sec = t?.section || "Other";
    bySection[sec] = bySection[sec] || [];
    bySection[sec].push(i);
  });

  let y = 24;
  (Object.keys(bySection) as Array<keyof typeof bySection>).forEach((sec) => {
    doc.setFontSize(12);
    doc.text(String(sec), 14, y);
    y += 4;
    const rows = bySection[sec]
      .filter((i) => i.completed_at)
      .slice(0, 40) // keep small for PDF size
      .map((i) => {
        const t = templates.find((t) => t.id === i.template_id);
        return [
          t?.title || i.template_id,
          t?.legal_ref || "-",
          t?.limit_text || "-",
          i.value ?? "",
          i.status,
          new Date(i.completed_at!).toLocaleDateString(),
        ];
      });

    autoTable(doc, {
      head: [["Task", "Legal Ref", "Limit", "Value", "Status", "Date"]],
      body: rows,
      startY: y,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [108, 117, 125] },
      didDrawPage: (data) => {
        y = data.cursor.y + 10;
      },
    });
  });

  const blob = doc.output("blob");
  return blob;
}
