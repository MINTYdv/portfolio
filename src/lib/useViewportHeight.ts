"use client";

import { useEffect } from "react";

// iOS Safari doesn't support the `interactive-widget` viewport meta value, and
// can still scroll/reflow the whole page when the on-screen keyboard opens —
// even with overflow:hidden on body — pushing fixed-height content out of
// view. window.visualViewport tracks the actually-visible area reliably, so
// we mirror it into CSS variables and pin the app to that instead of relying
// on the document's own (unreliable, on iOS) scroll/height behavior.
export function useViewportHeight() {
  useEffect(() => {
    const viewport = window.visualViewport;

    const setVars = () => {
      const height = viewport?.height ?? window.innerHeight;
      const offsetTop = viewport?.offsetTop ?? 0;
      document.documentElement.style.setProperty("--app-height", `${height}px`);
      document.documentElement.style.setProperty("--app-offset-top", `${offsetTop}px`);
    };

    setVars();
    viewport?.addEventListener("resize", setVars);
    viewport?.addEventListener("scroll", setVars);
    window.addEventListener("resize", setVars);

    return () => {
      viewport?.removeEventListener("resize", setVars);
      viewport?.removeEventListener("scroll", setVars);
      window.removeEventListener("resize", setVars);
    };
  }, []);
}
