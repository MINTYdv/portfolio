import type { NextRequest } from "next/server";
import { getAIProvider } from "@/lib/ai/provider";
import type { AIStreamEvent, AITurn } from "@/lib/ai/types";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/constants";
import { getClientKey } from "@/lib/server/clientKey";
import { checkRateLimit } from "@/lib/server/rateLimit";

const CHAT_RATE_LIMIT = 15;
const CHAT_RATE_WINDOW_MS = 60_000;
const MAX_HISTORY_TURNS = 20;
const MAX_REQUEST_BYTES = 50_000;

interface ChatRequestBody {
  message?: unknown;
  history?: unknown;
}

function parseHistory(raw: unknown): AITurn[] {
  if (!Array.isArray(raw)) return [];
  // Slice to the last N raw entries FIRST so a huge array can't force an
  // expensive full-array map/filter before we even look at it.
  return raw
    .slice(-MAX_HISTORY_TURNS)
    .filter(
      (turn): turn is { role: unknown; text: string } =>
        typeof turn === "object" && turn !== null && typeof (turn as Record<string, unknown>).text === "string"
    )
    .map((turn) => ({
      role: turn.role === "assistant" ? ("assistant" as const) : ("user" as const),
      text: turn.text.slice(0, MAX_MESSAGE_LENGTH),
    }));
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  if (!checkRateLimit(`chat:${clientKey}`, CHAT_RATE_LIMIT, CHAT_RATE_WINDOW_MS)) {
    return jsonError("Too many requests", 429);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonError("Request too large", 413);
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body", 400);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return jsonError("Invalid message", 400);
  }

  const history = parseHistory(body.history);

  let provider;
  try {
    provider = getAIProvider();
  } catch {
    return jsonError("AI is not configured", 503);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: AIStreamEvent) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      try {
        for await (const event of provider.streamReply(history, message)) {
          send(event);
        }
      } catch (error) {
        send({ type: "error", message: error instanceof Error ? error.message : "Unknown error" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
