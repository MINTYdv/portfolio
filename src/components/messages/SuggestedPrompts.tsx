"use client";

import { useEffect, useRef, useState, type WheelEvent } from "react";
import { SUGGESTED_PROMPTS } from "@/content/suggestedPrompts";

interface SuggestedPromptsProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const SCROLL_STEP_PX = 150;
const EASE_FACTOR = 0.18;

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M9 2 3.5 7 9 12" : "M5 2 10.5 7 5 12"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SuggestedPrompts({ onSelect, disabled }: SuggestedPromptsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
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

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Ease toward a (possibly moving) target instead of one native smooth-scroll
  // jump — handles rapid successive clicks/wheel ticks smoothly, and isn't at
  // the mercy of the browser's own scroll-behavior handling.
  const easeTowardTarget = (rawTarget: number) => {
    const el = scrollRef.current;
    if (!el) return;
    targetRef.current = Math.max(0, Math.min(rawTarget, el.scrollWidth - el.clientWidth));

    if (rafRef.current) return;

    const tick = () => {
      const node = scrollRef.current;
      if (!node || targetRef.current === null) {
        rafRef.current = null;
        return;
      }
      const diff = targetRef.current - node.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        node.scrollLeft = targetRef.current;
        targetRef.current = null;
        rafRef.current = null;
        return;
      }
      node.scrollLeft += diff * EASE_FACTOR;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const currentTarget = () => targetRef.current ?? scrollRef.current?.scrollLeft ?? 0;

  const scrollByStep = (direction: -1 | 1) => {
    easeTowardTarget(currentTarget() + direction * SCROLL_STEP_PX);
  };

  // Let a plain vertical mouse wheel scroll this row horizontally — the
  // natural gesture on desktop, where there's no touch/trackpad swipe.
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY === 0 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    easeTowardTarget(currentTarget() + event.deltaY);
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onWheel={handleWheel}
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
      <button
        type="button"
        aria-label="Scroll suggestions left"
        tabIndex={showLeftFade ? 0 : -1}
        onClick={() => scrollByStep(-1)}
        className={`absolute left-0 top-0 bottom-2 flex w-8 items-center justify-start bg-gradient-to-r from-white via-white/80 to-transparent pl-1 text-zinc-400 transition-opacity duration-200 hover:text-[#007AFF] ${
          showLeftFade ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        aria-label="Scroll suggestions right"
        tabIndex={showRightFade ? 0 : -1}
        onClick={() => scrollByStep(1)}
        className={`absolute right-0 top-0 bottom-2 flex w-8 items-center justify-end bg-gradient-to-l from-white via-white/80 to-transparent pr-1 text-zinc-400 transition-opacity duration-200 hover:text-[#007AFF] ${
          showRightFade ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}
