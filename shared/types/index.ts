// Shared types used by both client and server

export interface Timestamp {
  id: string;
  time: string;
  timeSeconds: number;
  label: string;
  tag: string;
  color?: string;
}

export interface LectureSummary {
  id: string;
  title: string;
  status: "processing" | "done" | "error";
  timestamps: Timestamp[];
  summary: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  lectureId: string;
  role: "user" | "ai";
  content: string;
  timestamp?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { message: string };
}
