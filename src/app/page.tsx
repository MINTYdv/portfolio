"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader";
import { IphoneFrame } from "@/components/iphone/IphoneFrame";
import { PhoneContent } from "@/components/iphone/PhoneContent";
import { useViewportHeight } from "@/lib/useViewportHeight";

const LOADER_DURATION_MS = 1400;

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  useViewportHeight();

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader visible={showLoader} />
      <div
        style={{ top: "var(--app-offset-top, 0px)", height: "var(--app-height, 100dvh)" }}
        className={`fixed left-0 right-0 transition-opacity duration-700 ease-out ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        <IphoneFrame>
          <PhoneContent />
        </IphoneFrame>
      </div>
    </>
  );
}
