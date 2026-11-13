"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card } from "@/components/Card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { StartScreen } from "@/components/StartScreen";
import { cardsByDeck, decks } from "@/data/cards";
import {
  initialLanguage,
  localize,
  readSavedLanguage,
  saveLanguage,
  ui,
} from "@/data/localization";
import {
  drawNext,
  goPrevious,
  newGame,
  revealFollowUp,
  type Game,
} from "@/lib/gameLogic";
import type { Deck, Language } from "@/types/card";

export default function Home() {
  const [selectedDeck, setSelectedDeck] = useState<Deck>("casual");
  const [game, setGame] = useState<Game | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [languageReady, setLanguageReady] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    const saved = readSavedLanguage();
    const resolved = initialLanguage(saved, navigator.language || "");
    setLanguage(resolved);
    setLanguageReady(true);
  }, []);

  useEffect(() => {
    if (!languageReady) return;
    document.documentElement.lang = language;
    document.title = ui[language].appTitle;
    document.documentElement.removeAttribute("data-lang-pending");
  }, [language, languageReady]);

  function changeLanguage(next: Language) {
    setLanguage(next);
    saveLanguage(next);
  }

  if (!game) {
    return <StartScreen selected={selectedDeck} onSelect={setSelectedDeck} onStart={() => setGame(newGame(selectedDeck))} language={language} onLanguageChange={changeLanguage} />;
  }

  const t = ui[language];
  const drawn = game.history[game.index];
  const deck = decks.find((item) => item.id === game.deck)!;
  const canGoPrevious = game.index > 0;

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) setGame((current) => current && drawNext(current));
    else setGame((current) => current && goPrevious(current));
  }

  return (
    <main className="screen mx-auto flex w-full max-w-xl flex-col px-5 py-6 sm:py-10">
      <header className="flex items-center justify-between gap-4">
        <button type="button" className="text-button utility-link" onClick={() => setGame(null)}>{t.changeDeck}</button>
        <LanguageSelector language={language} onChange={changeLanguage} />
      </header>

      <div className="flex flex-1 flex-col justify-center py-5 sm:py-8">
        <div
          onTouchStart={(event) => {
            if (event.touches.length === 1) touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            else touchStart.current = null;
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <Card
            key={`${game.deck}-${game.index}-${drawn.card.id}`}
            card={drawn.card}
            deckName={localize(deck.name, language)}
            language={language}
            followUpVisible={drawn.followUpVisible}
            onRevealFollowUp={() => setGame((current) => current && revealFollowUp(current, drawn.card.id))}
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 px-1 text-sm text-ink-muted">
          <span>{t.takeTurns}</span>
          <span className="shrink-0 tabular-nums" aria-label={t.cardProgress(drawn.progress, cardsByDeck[game.deck].length)}>
            {drawn.progress} / {cardsByDeck[game.deck].length}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          className="secondary-button"
          disabled={!canGoPrevious}
          onClick={() => setGame((current) => current && goPrevious(current))}
        >
          <span aria-hidden="true">←</span> {t.previous}
        </button>
        <button type="button" className="primary-button flex-1" onClick={() => setGame((current) => current && drawNext(current))}>
          {t.next} <span aria-hidden="true">→</span>
        </button>
      </div>
      <button type="button" className="restart-button mx-auto mt-3" onClick={() => setGame(newGame(game.deck))}>
        {t.restart}
      </button>
    </main>
  );
}
