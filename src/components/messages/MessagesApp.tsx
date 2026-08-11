"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { AIAction, AITurn } from "@/lib/ai/types";
import { ChatRequestError, streamChatReply } from "@/lib/chat/streamChatReply";
import { MIN_SEND_INTERVAL_MS } from "@/lib/chat/constants";
import { resolveNoteById } from "@/lib/content/resolveNote";
import { CHAT_ERROR_MESSAGES } from "@/lib/i18n/chatErrorMessages";
import { detectLanguage } from "@/lib/i18n/detectLanguage";
import type { ChatMessage, MessageAttachment } from "@/types/message";
import type { NoteContent } from "@/types/note";
import { HelloSuggestion } from "./HelloSuggestion";
import { MessageHeader } from "./MessageHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { SuggestedPrompts } from "./SuggestedPrompts";

const READ_DELAY_MS = 500;
const TYPING_START_DELAY_MS = 400;
const RATE_LIMIT_STATUS = 429;

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hey! It's Lenny 👋 Ask me about my projects, skills, or experience — or just say hi!",
};

interface MessagesAppProps {
  onOpenNote: (note: NoteContent) => void;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toAIHistory(chatMessages: ChatMessage[]): AITurn[] {
  return chatMessages
    .filter((m) => m.text.trim().length > 0)
    .map((m) => ({ role: m.role === "user" ? ("user" as const) : ("assistant" as const), text: m.text }));
}

export function MessagesApp({ onOpenNote }: MessagesAppProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const hasUserSpoken = messages.some((m) => m.role === "user");

  const pushCard = (attachment: MessageAttachment) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", text: "", attachment }]);
  };

  const applyAction = (action: AIAction) => {
    switch (action.type) {
      case "OPEN_NOTE": {
        const note = resolveNoteById(action.noteId);
        if (note) pushCard({ kind: "note", note });
        break;
      }
      case "OPEN_GITHUB": {
        // Only ever link to a GitHub URL that's actually ours — never render an
        // arbitrary URL the model returned, even if it looks like GitHub.
        const project = projects.find((p) => p.githubUrl === action.url);
        if (project?.githubUrl) {
          pushCard({ kind: "external", title: `${project.title} on GitHub`, url: project.githubUrl });
        }
        break;
      }
      case "OPEN_RESUME": {
        if (profile.resumeUrl) {
          pushCard({ kind: "external", title: "Lenny's Resume", url: profile.resumeUrl });
        }
        break;
      }
    }
  };

  const handleSend = async (text: string) => {
    if (isSending) return;
    setIsSending(true);
    const sentAt = Date.now();

    const historyBeforeThisTurn = toAIHistory(messages);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      status: "delivered",
    };
    setMessages((prev) => [...prev, userMessage]);

    await wait(READ_DELAY_MS);
    setMessages((prev) =>
      prev.map((m) => (m.id === userMessage.id ? { ...m, status: "read", readAt: Date.now() } : m))
    );

    await wait(TYPING_START_DELAY_MS);
    setIsTyping(true);

    try {
      const { text: replyText, actions } = await streamChatReply(historyBeforeThisTurn, text);
      setIsTyping(false);
      if (replyText.trim()) {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", text: replyText }]);
      }
      actions.forEach(applyAction);
    } catch (error) {
      setIsTyping(false);
      const messages_ = CHAT_ERROR_MESSAGES[detectLanguage(text)];
      let errorText = messages_.generic;
      if (error instanceof ChatRequestError && error.status === RATE_LIMIT_STATUS) {
        // "client" = our own rate limiter rejected the request (resets in ~1 min).
        // "provider" = Gemini itself returned 429 (usage/quota limits — can take much longer to clear).
        errorText = error.source === "client" ? messages_.rateLimit : messages_.providerUnavailable;
      }
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: errorText, isError: true },
      ]);
    } finally {
      // Enforce a minimum interval between sends regardless of how fast the
      // reply came back — a basic anti-spam cooldown independent of the reply latency.
      const remaining = MIN_SEND_INTERVAL_MS - (Date.now() - sentAt);
      if (remaining > 0) await wait(remaining);
      setIsSending(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <MessageHeader />
      <MessageList messages={messages} isTyping={isTyping} onOpenNote={onOpenNote} />
      {!hasUserSpoken && <HelloSuggestion onSend={handleSend} />}
      <SuggestedPrompts onSelect={handleSend} disabled={isSending} />
      <MessageInput onSend={handleSend} disabled={isSending} />
    </div>
  );
}
