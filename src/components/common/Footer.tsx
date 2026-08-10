import { profile } from "@/content/profile";
import { LanguageSelector } from "./LanguageSelector";

export function Footer() {
  return (
    <div className="flex items-center justify-between border-t border-zinc-100 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
      {profile.resumeUrl ? (
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-zinc-500"
        >
          Resume
        </a>
      ) : (
        <span aria-disabled className="text-[11px] font-medium text-zinc-300">
          Resume
        </span>
      )}
      <LanguageSelector />
    </div>
  );
}
