export type Section = "Opening" | "Service" | "Closing";

export type ProofType = "photo" | "value" | "value+photo" | "checkbox" | "note";

export interface TaskTemplate {
  id: string;
  section: Section;
  title: string;
  freq: string; // e.g., "Hourly", "Every 2 hours", "Shift start", "Closing"
  legal_ref?: string;
  limit_text?: string; // human readable limit text
  how_text?: string; // instructions
  proof_type: ProofType; // expected proof type
  action_label?: string; // button label
  sources?: { label: string; url?: string }[];
}

export type TaskStatus =
  | "Pending"
  | "Compliant"
  | "Non-Compliant"
  | "Overdue"
  | "Alert";

export interface TaskInstance {
  id: string;
  template_id: string;
  due_at: string; // ISO string
  status: TaskStatus;
  value?: number | null;
  photo_url?: string | null; // data URL for prototype
  notes?: string;
  corrective_action?: string;
  reviewer_initials?: string;
  completed_at?: string | null; // ISO
  fail_count?: number; // consecutive fails for auto-escalation
}

export interface Shift {
  id: string;
  venue_id?: string;
  date: string; // YYYY-MM-DD
  opened_at: string; // ISO
  closed_at?: string | null; // ISO
  manager_name: string;
  signature_url?: string | null;
}

export interface Report {
  id: string;
  shift_id: string;
  pdf_url: string; // blob URL
  created_at: string; // ISO
}
