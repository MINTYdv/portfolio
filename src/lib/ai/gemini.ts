import { buildSystemPrompt } from "./systemPrompt";
import { AI_TOOLS } from "./tools";
import type { AIAction, AIProvider, AIStreamEvent, AITurn } from "./types";

const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

interface GeminiPart {
  text?: string;
  functionCall?: { name: string; args?: Record<string, unknown> };
}

interface GeminiStreamChunk {
  candidates?: { content?: { parts?: GeminiPart[] } }[];
}

function toAIAction(name: string, args: Record<string, unknown> | undefined): AIAction | null {
  switch (name) {
    case "open_note": {
      const noteId = args?.noteId;
      return typeof noteId === "string" ? { type: "OPEN_NOTE", noteId } : null;
    }
    case "open_github": {
      const url = args?.url;
      return typeof url === "string" ? { type: "OPEN_GITHUB", url } : null;
    }
    case "open_resume":
      return { type: "OPEN_RESUME" };
    default:
      return null;
  }
}

export class GeminiProvider implements AIProvider {
  constructor(
    private readonly apiKey: string,
    private readonly model: string
  ) {}

  async *streamReply(history: AITurn[], message: string): AsyncGenerator<AIStreamEvent> {
    const contents = [
      ...history.map((turn) => ({
        role: turn.role === "assistant" ? "model" : "user",
        parts: [{ text: turn.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const body = {
      contents,
      systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
      tools: [{ functionDeclarations: AI_TOOLS }],
    };

    const url = `${API_BASE}/models/${this.model}:streamGenerateContent?alt=sse&key=${this.apiKey}`;

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      yield { type: "error", message: "Network error contacting the AI provider" };
      return;
    }

    if (!response.ok || !response.body) {
      yield { type: "error", message: `AI provider error (${response.status})`, status: response.status };
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;

          let parsed: GeminiStreamChunk;
          try {
            parsed = JSON.parse(jsonStr) as GeminiStreamChunk;
          } catch {
            continue;
          }

          const parts = parsed.candidates?.[0]?.content?.parts ?? [];
          for (const part of parts) {
            if (typeof part.text === "string" && part.text.length > 0) {
              yield { type: "text", text: part.text };
            }
            if (part.functionCall) {
              const action = toAIAction(part.functionCall.name, part.functionCall.args);
              if (action) yield { type: "action", action };
            }
          }
        }
      }
    } catch {
      yield { type: "error", message: "Connection to the AI provider was interrupted" };
      return;
    }

    yield { type: "done" };
  }
}
