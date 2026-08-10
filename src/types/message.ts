import type { NoteContent } from "./note";

export type MessageRole = "user" | "assistant";
export type MessageStatus = "delivered" | "read";

export type MessageAttachment =
  | { kind: "note"; note: NoteContent }
  | { kind: "external"; title: string; url: string };

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  status?: MessageStatus;
  readAt?: number;
  attachment?: MessageAttachment;
  isError?: boolean;
}
