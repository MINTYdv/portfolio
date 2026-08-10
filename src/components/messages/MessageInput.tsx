"use client";

import { useState, type KeyboardEvent } from "react";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/constants";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function WaveformIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 8v0M4 5.5v5M6.5 3v10M9 5.5v5M11.5 6.5v3M14.5 8v0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 13V3M8 3 3.5 7.5M8 3l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [value, setValue] = useState("");
  const hasText = value.trim().length > 0;
  const canSend = hasText && !disabled;

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 border-t border-zinc-200 px-2 pb-2 pt-2">
      <button
        type="button"
        aria-label="Add attachment"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007AFF]"
      >
        <PlusIcon />
      </button>

      <div className="flex flex-1 items-center gap-1 rounded-full bg-zinc-100 py-1.5 pl-4 pr-1.5 focus-within:ring-2 focus-within:ring-[#007AFF]/60">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
          aria-label="Message"
          maxLength={MAX_MESSAGE_LENGTH}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-black placeholder:text-zinc-400 focus:outline-none"
        />
        {hasText ? (
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#007AFF] text-white transition-colors disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007AFF]"
          >
            <SendIcon />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Dictate message"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007AFF]"
          >
            <WaveformIcon />
          </button>
        )}
      </div>
    </div>
  );
}
