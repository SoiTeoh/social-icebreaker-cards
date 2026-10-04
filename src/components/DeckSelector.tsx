import { decks } from "@/data/cards";
import { localize, ui } from "@/data/localization";
import type { Deck, Language } from "@/types/card";

type Props = { selected: Deck; onSelect: (deck: Deck) => void; language: Language };

export function DeckSelector({ selected, onSelect, language }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3" role="group" aria-label={ui[language].chooseDeck}>
      {decks.map((deck) => (
        <button
          key={deck.id}
          type="button"
          onClick={() => onSelect(deck.id)}
          aria-pressed={selected === deck.id}
          className={`deck-option deck-${deck.id} ${selected === deck.id ? "selected" : ""}`}
        >
          <span className="deck-icon" aria-hidden="true">{deck.icon}</span>
          <span className="block text-xl font-semibold">{localize(deck.name, language)}</span>
          <span className="mt-1 block text-sm leading-snug opacity-70">{localize(deck.description, language)}</span>
        </button>
      ))}
    </div>
  );
}
