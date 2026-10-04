import { DeckSelector } from "@/components/DeckSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ui } from "@/data/localization";
import type { Deck, Language } from "@/types/card";

type Props = { selected: Deck; onSelect: (deck: Deck) => void; onStart: () => void; language: Language; onLanguageChange: (language: Language) => void };

export function StartScreen({ selected, onSelect, onStart, language, onLanguageChange }: Props) {
  const t = ui[language];
  return (
    <main className="screen mx-auto flex w-full max-w-lg flex-col px-5 py-8 sm:py-12">
      <div className="mb-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="brand-mark" aria-hidden="true">✳</div>
          <LanguageSelector language={language} onChange={onLanguageChange} />
        </div>
        <p className="eyebrow mt-10">{t.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          {t.headlineFirst}<br /><span className="text-terracotta">{t.headlineSecond}</span>
        </h1>
        <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink-muted">
          {t.intro}
        </p>
        <div className="mt-10 mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold">{t.chooseDeck}</h2>
          <span className="text-sm text-ink-muted">{t.deckCount}</span>
        </div>
        <DeckSelector selected={selected} onSelect={onSelect} language={language} />
      </div>
      <button type="button" className="primary-button mt-8" onClick={onStart}>
        {t.start} <span aria-hidden="true">↗</span>
      </button>
      <p className="mt-4 text-center text-sm text-ink-muted">{t.noRules}</p>
    </main>
  );
}
