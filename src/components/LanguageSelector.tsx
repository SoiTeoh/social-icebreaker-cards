import { ui } from "@/data/localization";
import type { Language } from "@/types/card";

type Props = { language: Language; onChange: (language: Language) => void };

export function LanguageSelector({ language, onChange }: Props) {
  return (
    <label className="language-selector">
      <span className="sr-only">{ui[language].language}</span>
      <span aria-hidden="true">🌐</span>
      <select value={language} onChange={(event) => onChange(event.target.value as Language)} aria-label={ui[language].language}>
        <option value="en">English</option>
        <option value="zh-CN">简体中文</option>
      </select>
    </label>
  );
}
