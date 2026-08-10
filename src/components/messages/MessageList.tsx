"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/message";
import type { NoteContent } from "@/types/note";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onOpenNote: (note: NoteContent) => void;
}

export function MessageList({ messages, isTyping, onOpenNote }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];
  const lastUserId = [...messages].reverse().find((m) => m.role === "user")?.id;
  const showStatusOnLastUser = lastMessage?.role === "user";

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-3 py-3">
      {messages.map((message, index) => {
        const nextMessage = messages[index + 1];
        const isLastInGroup = !nextMessage || nextMessage.role !== message.role;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            showStatus={showStatusOnLastUser && message.id === lastUserId}
            isLastInGroup={isLastInGroup}
            onOpenNote={onOpenNote}
          />
        );
      })}
      {isTyping && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
