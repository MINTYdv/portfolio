import type { ReactNode } from "react";
import { DynamicIsland } from "./DynamicIsland";
import { StatusBar } from "./StatusBar";

interface IphoneFrameProps {
  children: ReactNode;
}

// Desktop: a centered virtual iPhone with a bezel. Mobile: fullscreen, no fake hardware chrome —
// the real device notch/safe-area handles that.
export function IphoneFrame({ children }: IphoneFrameProps) {
  return (
    <div className="flex min-h-dvh justify-center md:items-center md:bg-zinc-100 md:p-8">
      <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-white md:aspect-[390/844] md:h-[min(844px,calc(100dvh-4rem))] md:w-auto md:rounded-[55px] md:border-[8px] md:border-black md:shadow-2xl">
        <DynamicIsland />
        <StatusBar />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
