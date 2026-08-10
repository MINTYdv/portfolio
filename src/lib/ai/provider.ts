import { GeminiProvider } from "./gemini";
import type { AIProvider } from "./types";

// "Lite" has a materially higher free-tier request quota than the full flash
// model, which matters for a low-traffic portfolio assistant like this one.
const DEFAULT_MODEL = "gemini-flash-lite-latest";

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
