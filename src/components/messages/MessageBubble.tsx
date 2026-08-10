import type { ChatMessage } from "@/types/message";
import type { NoteContent } from "@/types/note";
import { LinkPreviewCard } from "./LinkPreviewCard";

interface MessageBubbleProps {
  message: ChatMessage;
  showStatus: boolean;
  isLastInGroup: boolean;
  onOpenNote: (note: NoteContent) => void;
}

export function MessageBubble({ message, showStatus, isLastInGroup, onOpenNote }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (message.attachment) {
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <LinkPreviewCard attachment={message.attachment} onOpenNote={onOpenNote} />
      </div>
    );
  }

  const tailCorner = isUser ? "rounded-br-md" : "rounded-bl-md";
  const bubbleColor = message.isError
    ? "bg-[#FF3B30] text-white"
    : isUser
      ? "bg-[#007AFF] text-white"
      : "bg-[#E9E9EB] text-black";

  return (
    <div className={`msg-enter flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        role={message.isError ? "alert" : undefined}
        className={`max-w-[75%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-[15px] leading-[1.3] ${
          isLastInGroup ? tailCorner : ""
        } ${bubbleColor}`}
      >
        {message.text}
      </div>
      {showStatus && message.status && (
        <span key={message.status} className="animate-fade-in mt-1 pr-1 text-[11px] text-zinc-400">
          {message.status === "delivered" ? "Delivered" : `Read${message.readAt ? ` ${formatTime(message.readAt)}` : ""}`}
        </span>
      )}
    </div>
  );
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
