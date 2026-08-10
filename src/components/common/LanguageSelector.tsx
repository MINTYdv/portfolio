"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LANGUAGES } from "@/lib/i18n/languages";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          aria-pressed={language === lang.code}
          className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium transition-colors ${
            language === lang.code ? "bg-zinc-200 text-zinc-600" : "text-zinc-400"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
