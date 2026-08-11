import type { LanguageCode } from "./languages";

const CJK_PATTERN = /[぀-ヿ㐀-鿿가-힯]/;
const FRENCH_PATTERN = /[àâäéèêëïîôöùûüÿçœ]|(?:\b(?:je|tu|le|la|les|des|une|est|pas|bonjour|merci|salut)\b)/i;

// Lightweight heuristic language detection — no dependency needed for the
// handful of languages our error messages are translated into. Only used to
// pick which language an error message should show in, based on what the
// visitor was just typing.
export function detectLanguage(text: string): LanguageCode {
  if (CJK_PATTERN.test(text)) return "zh";
  if (FRENCH_PATTERN.test(text)) return "fr";
  return "en";
}
