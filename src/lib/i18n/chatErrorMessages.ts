import type { LanguageCode } from "./languages";

interface ChatErrorMessages {
  generic: string;
  rateLimit: string;
  providerUnavailable: string;
}

export const CHAT_ERROR_MESSAGES: Record<LanguageCode, ChatErrorMessages> = {
  en: {
    generic: "Sorry, I couldn't reply right now. Try again in a moment.",
    rateLimit: "You're sending messages a bit too fast — please wait a moment before trying again.",
    providerUnavailable: "The AI assistant is temporarily unavailable (usage limits reached). Please try again later.",
  },
  fr: {
    generic: "Désolé, je n'ai pas pu répondre pour le moment. Réessaie dans un instant.",
    rateLimit: "Tu envoies des messages un peu trop vite — merci d'attendre un instant avant de réessayer.",
    providerUnavailable: "L'assistant IA est temporairement indisponible (limite d'utilisation atteinte). Merci de réessayer plus tard.",
  },
  zh: {
    generic: "抱歉，我现在无法回复。请稍后再试。",
    rateLimit: "你发送消息的速度有点快，请稍等片刻再试。",
    providerUnavailable: "AI 助手暂时不可用（已达到使用限制）。请稍后再试。",
  },
};
