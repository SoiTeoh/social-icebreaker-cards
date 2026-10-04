"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/Card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { StartScreen } from "@/components/StartScreen";
import { cardsByDeck, decks } from "@/data/cards";
import { initialLanguage, localize, ui } from "@/data/localization";
import type { Card as CardType, Deck, Language } from "@/types/card";

type DrawnCard = { card: CardType; progress: number; followUpVisible: boolean };
type Game = { deck: Deck; remaining: CardType[]; history: DrawnCard[]; index: number };

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function drawNext(game: Game): Game {
  // After Previous, revisit cards already seen before drawing from the queue.
  if (game.index < game.history.length - 1) {
    return { ...game, index: game.index + 1 };
  }

  let remaining = game.remaining;
  const previous = game.history[game.index];
  if (remaining.length === 0) {
    remaining = shuffle(cardsByDeck[game.deck]);
    if (remaining.length > 1 && remaining[remaining.length - 1].id === previous?.card.id) {
      [remaining[0], remaining[remaining.length - 1]] = [remaining[remaining.length - 1], remaining[0]];
    }
  }

  const card = remaining[remaining.length - 1];
  const progress = previous ? (previous.progress % cardsByDeck[game.deck].length) + 1 : 1;
  const history = [...game.history, { card, progress, followUpVisible: false }];
  // A few deck cycles are enough for accidental taps without unbounded history.
  if (history.length > 60) history.shift();
  return { ...game, remaining: remaining.slice(0, -1), history, index: history.length - 1 };
}

function newGame(deck: Deck): Game {
  return drawNext({ deck, remaining: [], history: [], index: -1 });
}

export default function Home() {
  const [selectedDeck, setSelectedDeck] = useState<Deck>("casual");
  const [game, setGame] = useState<Game | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("social-icebreaker-language"); } catch { /* Storage may be unavailable. */ }
    setLanguage(initialLanguage(saved, navigator.language));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = ui[language].appTitle;
  }, [language]);

  function changeLanguage(next: Language) {
    setLanguage(next);
    try { localStorage.setItem("social-icebreaker-language", next); } catch { /* Keep the in-memory choice. */ }
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
    else setGame((current) => current && current.index > 0 ? { ...current, index: current.index - 1 } : current);
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
            onRevealFollowUp={() => setGame((current) => {
              if (!current || current.history[current.index]?.card.id !== drawn.card.id) return current;
              const history = [...current.history];
              history[current.index] = { ...history[current.index], followUpVisible: true };
              return { ...current, history };
            })}
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
          onClick={() => setGame((current) => current && current.index > 0 ? { ...current, index: current.index - 1 } : current)}
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
