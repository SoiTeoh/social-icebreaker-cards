import { cardsByDeck } from "@/data/cards";
import type { Card as CardType, Deck } from "@/types/card";

export const MAX_HISTORY = 60;

export type DrawnCard = { card: CardType; progress: number; followUpVisible: boolean };
export type Game = { deck: Deck; remaining: CardType[]; history: DrawnCard[]; index: number };

export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function drawNext(
  game: Game,
  deckCards: readonly CardType[] = cardsByDeck[game.deck],
  rng: () => number = Math.random,
): Game {
  // After Previous, revisit cards already seen before drawing from the queue.
  if (game.index < game.history.length - 1) {
    return { ...game, index: game.index + 1 };
  }

  let remaining = game.remaining;
  const previous = game.history[game.index];
  if (remaining.length === 0) {
    remaining = shuffle(deckCards, rng);
    if (remaining.length > 1 && remaining[remaining.length - 1].id === previous?.card.id) {
      [remaining[0], remaining[remaining.length - 1]] = [
        remaining[remaining.length - 1],
        remaining[0],
      ];
    }
  }

  const card = remaining[remaining.length - 1];
  const progress = previous ? (previous.progress % deckCards.length) + 1 : 1;
  const history = [...game.history, { card, progress, followUpVisible: false }];
  // A few deck cycles are enough for accidental taps without unbounded history.
  if (history.length > MAX_HISTORY) history.shift();
  return { ...game, remaining: remaining.slice(0, -1), history, index: history.length - 1 };
}

export function goPrevious(game: Game): Game {
  if (game.index <= 0) return game;
  return { ...game, index: game.index - 1 };
}

export function newGame(
  deck: Deck,
  deckCards: readonly CardType[] = cardsByDeck[deck],
  rng: () => number = Math.random,
): Game {
  return drawNext({ deck, remaining: [], history: [], index: -1 }, deckCards, rng);
}

export function revealFollowUp(game: Game, expectedCardId: string): Game {
  if (game.history[game.index]?.card.id !== expectedCardId) return game;
  const history = [...game.history];
  history[game.index] = { ...history[game.index], followUpVisible: true };
  return { ...game, history };
}
