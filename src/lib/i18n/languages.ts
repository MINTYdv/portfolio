export interface LanguageOption {
  code: "fr" | "en" | "zh";
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

export type LanguageCode = LanguageOption["code"];
