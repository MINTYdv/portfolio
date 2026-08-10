"use client";

import { useEffect, useState } from "react";
import { HELLO_GREETINGS } from "@/content/greetings";

interface HelloSuggestionProps {
  onSend: (text: string) => void;
}

const ROTATE_MS = 3000;
const FADE_MS = 200;
const HELLO_SENT_STORAGE_KEY = "murte-portfolio:hello-sent";

interface HelloCountResponse {
  count: number;
}

function hasAlreadySentHello(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(HELLO_SENT_STORAGE_KEY) === "1";
  } catch {
    // Storage can throw in private browsing / disabled-storage contexts — fail open.
    return false;
  }
}

function markHelloSent(): void {
  try {
    window.localStorage.setItem(HELLO_SENT_STORAGE_KEY, "1");
  } catch {
    // Ignore — worst case this visitor's hello isn't deduplicated on reload.
  }
}

export function HelloSuggestion({ onSend }: HelloSuggestionProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % HELLO_GREETINGS.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/hello")
      .then((res) => (res.ok ? (res.json() as Promise<HelloCountResponse>) : null))
      .then((data) => {
        if (!cancelled && data) setCount(data.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const current = HELLO_GREETINGS[index];

  const handleClick = () => {
    onSend(current.text);

    // Only count once per visitor (best-effort, via localStorage) — clicking
    // the suggestion again in a later session still sends a real message,
    // it just doesn't inflate the public counter again.
    if (hasAlreadySentHello()) return;
    markHelloSent();
    fetch("/api/hello", { method: "POST" })
      .then((res) => (res.ok ? (res.json() as Promise<HelloCountResponse>) : null))
      .then((data) => {
        if (data) setCount(data.count);
      })
      .catch(() => {});
  };

  return (
    <div className="flex flex-col items-center gap-1 px-3 pb-2">
      <button
        type="button"
        onClick={handleClick}
        className={`rounded-full bg-zinc-100 px-4 py-1.5 text-[13px] font-medium text-zinc-600 transition-opacity duration-200 active:bg-zinc-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {current.text}
      </button>
      {count !== null && (
        <span
          className={`text-[11px] text-zinc-400 transition-opacity duration-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {current.helloCountLabel(count)}
        </span>
      )}
    </div>
  );
}
