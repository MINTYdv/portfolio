import { profile } from "@/content/profile";

interface LoaderProps {
  visible: boolean;
}

export function Loader({ visible }: LoaderProps) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-white transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <p className="animate-fade-in text-2xl font-semibold tracking-tight text-black">
        {profile.name}
      </p>
      <p className="animate-fade-in text-sm text-zinc-500 [animation-delay:150ms]">
        {profile.tagline}
      </p>
    </div>
  );
}
