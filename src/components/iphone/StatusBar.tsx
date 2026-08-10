"use client";

import { useEffect, useState } from "react";

const FALLBACK_TIME = "9:41";

function getCurrentTime(): string {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
}

function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
      <rect x="0" y="7" width="3" height="5" rx="0.5" />
      <rect x="5" y="5" width="3" height="7" rx="0.5" />
      <rect x="10" y="3" width="3" height="9" rx="0.5" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
      <path d="M8 10.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
      <path d="M8 7.2c1.24 0 2.37.44 3.26 1.17l-1.28 1.55A3.2 3.2 0 0 0 8 9.2a3.2 3.2 0 0 0-1.98.72L4.74 8.37A5.18 5.18 0 0 1 8 7.2Z" />
      <path d="M8 4.2c2.05 0 3.92.72 5.4 1.92l-1.27 1.55A6.18 6.18 0 0 0 8 6.2a6.18 6.18 0 0 0-4.13 1.47L2.6 6.12A8.18 8.18 0 0 1 8 4.2Z" />
      <path d="M8 1.2c2.86 0 5.47 1 7.53 2.68l-1.27 1.55A9.18 9.18 0 0 0 8 3.2a9.18 9.18 0 0 0-6.26 2.23L.47 3.88A11.18 11.18 0 0 1 8 1.2Z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
      <rect x="0.75" y="0.75" width="20.5" height="10.5" rx="2.5" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2.25" y="2.25" width="17.5" height="7.5" rx="1.5" fill="currentColor" />
      <path d="M23 4v4a1.5 1.5 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

export function StatusBar() {
  const [time, setTime] = useState<string>(FALLBACK_TIME);

  useEffect(() => {
    const tick = () => setTime(getCurrentTime());
    const initial = setTimeout(tick, 0);
    const interval = setInterval(tick, 10_000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-7 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))] text-[15px] font-semibold tracking-tight text-black md:pt-4">
      <span suppressHydrationWarning>{time}</span>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
