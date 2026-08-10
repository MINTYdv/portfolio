export type AIAction =
  | { type: "OPEN_NOTE"; noteId: string }
  | { type: "OPEN_GITHUB"; url: string }
  | { type: "OPEN_RESUME" };

export type AITurnRole = "user" | "assistant";

export interface AITurn {
  role: AITurnRole;
  text: string;
}

export type AIStreamEvent =
  | { type: "text"; text: string }
  | { type: "action"; action: AIAction }
  | { type: "done" }
  | { type: "error"; message: string; status?: number };

export interface AIProvider {
  streamReply(history: AITurn[], message: string): AsyncGenerator<AIStreamEvent>;
}
