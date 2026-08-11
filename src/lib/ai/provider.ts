import { GeminiProvider } from "./gemini";
import type { AIProvider } from "./types";

// The "lite" variant has a higher free-tier quota but is unreliable at
// function calling (tested: it frequently skips open_note entirely, even
// with an explicit "always call the tool" rule in the system prompt) — since
// tool calls are how notes/cards actually appear, correctness wins over quota.
const DEFAULT_MODEL = "gemini-flash-latest";

let cached: AIProvider | null = null;

// Single seam for swapping providers later: add a new class implementing
// AIProvider and branch on an env var here — call sites never change.
export function getAIProvider(): AIProvider {
  if (cached) return cached;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = process.env.GEMINI_MODEL ?? DEFAULT_MODEL;
  cached = new GeminiProvider(apiKey, model);
  return cached;
}
