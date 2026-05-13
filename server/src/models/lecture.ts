export interface Timestamp {
  id: string;
  time: string;         // "MM:SS" or "HH:MM:SS"
  timeSeconds: number;
  label: string;
  tag: string;
  color?: string;
}

export interface Lecture {
  id: string;
  title: string;
  filename: string;
  originalName: string;
  size: number;
  status: "processing" | "done" | "error";
  timestamps: Timestamp[];
  summary: string | null;
  transcription?: string;
  createdAt: Date;
  updatedAt: Date;
}
