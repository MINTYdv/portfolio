import type { AIAction, AIStreamEvent, AITurn } from "@/lib/ai/types";

export interface StreamChatResult {
  text: string;
  actions: AIAction[];
}

export type ChatErrorSource = "client" | "provider";

export class ChatRequestError extends Error {
  status?: number;
  source: ChatErrorSource;

  constructor(message: string, source: ChatErrorSource, status?: number) {
    super(message);
    this.name = "ChatRequestError";
    this.source = source;
    this.status = status;
  }
}

export async function streamChatReply(history: AITurn[], message: string): Promise<StreamChatResult> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  // A non-ok response here means OUR /api/chat route rejected the request
  // before ever reaching Gemini (our own rate limiter, bad input, missing key).
  if (!response.ok || !response.body) {
    throw new ChatRequestError("Chat request failed", "client", response.status);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  const actions: AIAction[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;
      const event = JSON.parse(line) as AIStreamEvent;
      if (event.type === "text") text += event.text;
      else if (event.type === "action") actions.push(event.action);
      // An error inside the stream means Gemini itself failed (quota, auth, network) —
      // distinct from our own upfront rejection above.
      else if (event.type === "error") throw new ChatRequestError(event.message, "provider", event.status);
    }
  }

  return { text, actions };
}
