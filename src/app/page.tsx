"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader";
import { IphoneFrame } from "@/components/iphone/IphoneFrame";
import { PhoneContent } from "@/components/iphone/PhoneContent";

const LOADER_DURATION_MS = 1400;

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader visible={showLoader} />
      <div
        className={`transition-opacity duration-700 ease-out ${
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
