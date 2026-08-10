"use client";

import { useEffect, useRef, useState } from "react";
import { SUGGESTED_PROMPTS } from "@/content/suggestedPrompts";

interface SuggestedPromptsProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export function SuggestedPrompts({ onSelect, disabled }: SuggestedPromptsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateFades = () => {
      setShowLeftFade(el.scrollLeft > 4);
      setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    updateFades();
    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    return () => {
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(prompt)}
            className="shrink-0 rounded-full border border-[#007AFF]/30 bg-[#007AFF]/5 px-3.5 py-1.5 text-[13px] font-medium text-[#007AFF] transition-colors active:bg-[#007AFF]/15 disabled:opacity-40"
          >
            {prompt}
          </button>
        ))}
      </div>
      <div
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${
          showLeftFade ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 ${
          showRightFade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
