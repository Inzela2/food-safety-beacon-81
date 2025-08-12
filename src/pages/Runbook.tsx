import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Download, Flag, Play, StopCircle } from "lucide-react";
import { useRunbook } from "@/context/RunbookContext";
import { TaskActionSheet } from "@/components/TaskActionSheet";
import type { TaskInstance, TaskStatus, TaskTemplate } from "@/types/runbook";

function statusColor(status: TaskStatus) {
  switch (status) {
    case "Compliant":
      return "bg-green-100 text-green-800";
    case "Non-Compliant":
      return "bg-red-100 text-red-800";
    case "Overdue":
      return "bg-red-100 text-red-800";
    case "Alert":
      return "bg-red-100 text-red-800";
    default:
      return "bg-muted text-foreground";
  }
}

function isOverdue(inst: TaskInstance) {
  return inst.status === "Pending" && new Date(inst.due_at) < new Date();
}

export default function Runbook() {
  const { templates, instances, currentShift, startShift, closeShift, inspectorPack } = useRunbook();
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  // Derive dynamic statuses (mark Overdue visual if pending and past due)
  const enriched = useMemo(
    () => instances.map((i) => ({ ...i, derivedStatus: isOverdue(i) ? ("Overdue" as TaskStatus) : i.status })),
    [instances]
  );

  const grouped = useMemo(() => {
    const byTemplate: Record<string, TaskTemplate> = Object.fromEntries(templates.map((t) => [t.id, t]));
    const opening = enriched.filter((i) => byTemplate[i.template_id]?.section === "Opening");
    const service = enriched.filter((i) => byTemplate[i.template_id]?.section === "Service");
    const closing = enriched.filter((i) => byTemplate[i.template_id]?.section === "Closing");
    const sortByDue = (a: TaskInstance, b: TaskInstance) => new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
    return {
      opening: opening.sort(sortByDue),
      service: service.sort(sortByDue),
      closing: closing.sort(sortByDue),
      byTemplate,
    };
  }, [templates, enriched]);

  const onStart = async () => {
    const name = window.prompt("Manager name for this shift?", "Manager");
    if (name) startShift(name);
  };

  const onClose = async () => {
    const rep = await closeShift();
    if (rep) setReportUrl(rep.pdf_url);
  };

  const onInspectorPack = async () => {
    const blob = await inspectorPack();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inspector-pack.pdf";
    a.click();
  };

  const renderItem = (inst: any) => {
    const t = grouped.byTemplate[inst.template_id];
    const due = new Date(inst.due_at);
    const dueStr = due.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const badgeCls = statusColor(inst.derivedStatus);

    return (
      <Card key={inst.id} className="mb-3">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{t.title}</h3>
                {t.limit_text && <Badge variant="secondary">{t.limit_text}</Badge>}
              </div>
              <div className="mt-1 text-xs opacity-70">{t.legal_ref}</div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <Clock className="h-3 w-3" /> Due {dueStr}
                <Badge className={badgeCls}>{inst.derivedStatus}</Badge>
              </div>
            </div>
            <TaskActionSheet template={t} instance={inst} />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-4">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shift Runbook</h1>
          <div className="flex items-center gap-2">
            {!currentShift ? (
              <Button onClick={onStart}>
                <Play className="h-4 w-4 mr-1" /> Start Shift
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={onInspectorPack}>
                  <Download className="h-4 w-4 mr-1" /> Inspector Pack
                </Button>
                <Button variant="destructive" onClick={onClose}>
                  <StopCircle className="h-4 w-4 mr-1" /> Close Shift
                </Button>
              </>
            )}
          </div>
        </header>

        {reportUrl && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Daily PDF ready</CardTitle>
            </CardHeader>
            <CardContent>
              <a className="underline" href={reportUrl} target="_blank" rel="noreferrer">
                Open Daily Log PDF
              </a>
            </CardContent>
          </Card>
        )}

        {currentShift ? (
          <div>
            {/* Opening */}
            <section className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Opening</h2>
                <Badge variant="outline">{grouped.opening.length}</Badge>
              </div>
              <div className="mt-2">{grouped.opening.map(renderItem)}</div>
            </section>
            <Separator />

            {/* Service */}
            <section className="my-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Service</h2>
                <Badge variant="outline">{grouped.service.length}</Badge>
              </div>
              <div className="mt-2">{grouped.service.map(renderItem)}</div>
            </section>
            <Separator />

            {/* Closing */}
            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Closing</h2>
                <Badge variant="outline">{grouped.closing.length}</Badge>
              </div>
              <div className="mt-2">{grouped.closing.map(renderItem)}</div>
            </section>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Start your shift</CardTitle>
            </CardHeader>
            <CardContent>
              Begin to generate today’s Opening → Service → Closing queue.
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
