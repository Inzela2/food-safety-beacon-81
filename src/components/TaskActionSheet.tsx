import { useMemo, useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TaskInstance, TaskTemplate } from "@/types/runbook";
import { useRunbook } from "@/context/RunbookContext";

interface Props {
  template: TaskTemplate;
  instance: TaskInstance;
}

export const TaskActionSheet = ({ template, instance }: Props) => {
  const { completeInstance } = useRunbook();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(undefined);

  const requiresValue = template.proof_type.includes("value");
  const requiresPhoto = template.proof_type.includes("photo");
  const requiresCheckbox = template.proof_type === "checkbox";
  const requiresNote = template.proof_type === "note";

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(reader.result as string);
    reader.readAsDataURL(f);
  };

  const onSave = () => {
    completeInstance(instance.id, {
      value: typeof value === "number" ? value : undefined,
      photoDataUrl,
      notes: notes || undefined,
      compliant: requiresCheckbox ? checked : undefined,
    });
    setOpen(false);
    // reset
    setValue("");
    setNotes("");
    setChecked(false);
    setPhotoDataUrl(undefined);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm">{template.action_label || "Record"}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md p-4">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              {template.title}
              {template.limit_text && <Badge variant="secondary">Limit: {template.limit_text}</Badge>}
            </DrawerTitle>
            <DrawerDescription>
              {template.legal_ref && (
                <div className="text-xs opacity-70 mb-2">Legal Ref: {template.legal_ref}</div>
              )}
              {template.how_text}
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 p-4">
            {requiresValue && (
              <div className="grid gap-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  inputMode="decimal"
                  value={value}
                  onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="Enter reading"
                />
              </div>
            )}

            {requiresPhoto && (
              <div className="grid gap-2">
                <Label htmlFor="photo">Photo</Label>
                <Input id="photo" type="file" accept="image/*" onChange={onFileChange} />
                {photoDataUrl && (
                  <img src={photoDataUrl} alt="proof photo" className="mt-2 h-24 w-24 object-cover rounded" />
                )}
              </div>
            )}

            {requiresCheckbox && (
              <div className="flex items-center gap-2">
                <input id="confirm" type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                <Label htmlFor="confirm">Confirm task completed</Label>
              </div>
            )}

            {(requiresNote || template.proof_type === "checkbox") && (
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes or corrective actions" />
              </div>
            )}

            {template.sources && template.sources.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-xs underline cursor-pointer w-max">
                      <Info className="h-3 w-3" /> Sources
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <ul className="text-xs space-y-1 max-w-[240px]">
                      {template.sources.map((s, idx) => (
                        <li key={idx}>
                          {s.url ? (
                            <a className="underline" href={s.url} target="_blank" rel="noreferrer">
                              {s.label}
                            </a>
                          ) : (
                            s.label
                          )}
                        </li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <DrawerFooter>
            <Button onClick={onSave}>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
