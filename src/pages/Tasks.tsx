import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRunbook } from "@/context/RunbookContext";
import type { TaskStatus } from "@/types/runbook";

function statusVariant(status: TaskStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Compliant":
      return "default";
    case "Non-Compliant":
      return "destructive";
    case "Overdue":
      return "destructive";
    case "Alert":
      return "destructive";
    default:
      return "secondary";
  }
}

export default function Tasks() {
  const { instances, templates } = useRunbook();
  const [query, setQuery] = useState("");
  const byTemplate = useMemo(() => Object.fromEntries(templates.map((t) => [t.id, t])), [templates]);
  const enriched = useMemo(
    () =>
      instances
        .map((i) => ({ ...i, template: byTemplate[i.template_id] }))
        .filter((x) =>
          [x.template?.title || "", x.template?.section || "", x.template?.legal_ref || ""].some((f) =>
            f.toLowerCase().includes(query.toLowerCase())
          )
        ),
    [instances, byTemplate, query]
  );

  const byStatus = (s: TaskStatus) => enriched.filter((e) => e.status === s);

  const render = (list: typeof enriched) => (
    <div className="space-y-3">
      {list.map((e) => (
        <Card key={e.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{e.template?.title}</div>
                <div className="text-xs opacity-70">{e.template?.section} • {e.template?.legal_ref}</div>
              </div>
              <Badge variant={statusVariant(e.status)}>{e.status}</Badge>
            </div>
            {typeof e.value !== "undefined" && (
              <div className="mt-2 text-xs">Value: {e.value}</div>
            )}
            {e.notes && <div className="mt-1 text-xs">Notes: {e.notes}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Task History</h1>
        </header>

        <div className="mb-4">
          <Input placeholder="Search by task, section, legal ref..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All ({enriched.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({byStatus("Pending").length})</TabsTrigger>
            <TabsTrigger value="compliant">Compliant ({byStatus("Compliant").length})</TabsTrigger>
            <TabsTrigger value="noncompliant">Non-Compliant ({byStatus("Non-Compliant").length})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({byStatus("Overdue").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">{render(enriched)}</TabsContent>
          <TabsContent value="pending" className="mt-4">{render(byStatus("Pending"))}</TabsContent>
          <TabsContent value="compliant" className="mt-4">{render(byStatus("Compliant"))}</TabsContent>
          <TabsContent value="noncompliant" className="mt-4">{render(byStatus("Non-Compliant"))}</TabsContent>
          <TabsContent value="overdue" className="mt-4">{render(byStatus("Overdue"))}</TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
