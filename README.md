# Social Icebreaker Cards

A lightweight, mobile-first conversation game for people sharing a phone. Pick a deck, draw a card, talk, and follow the conversation.

The product aims to feel like a quiet host or card dealer: it starts a conversation, offers a little guidance when useful, and lets people look back at each other rather than at the screen. Whether the conversation cues improve real conversations remains a **product hypothesis**.

## Project status

**Phases 1–3 are implemented. Phase 4 adds an English and Simplified Chinese localization foundation.** Real-group playtesting is still needed to assess the conversation cues and review Chinese wording with native speakers.

| Phase | Status | Focus |
| --- | --- | --- |
| 1 — Prototype | Implemented | Four decks, local questions, non-repeating random draws |
| 2 — Playability | Implemented; playtesting pending | Progress, Previous, Restart, Change Deck, swipes, subtle transition |
| 3 — Conversation system | Implemented; conversation impact unvalidated | Answer modes, optional follow-ups, and intensity metadata on 28 existing cards |
| 4 — Multilingual foundation | Implemented; language review pending | English and Simplified Chinese UI and card content, local preference, English fallback |
| 5 — Content expansion | Future | Improve and expand the curated card library |
| 6 — Custom decks | Future | Explore locally saved personal decks |
| 7 — Sharing | Future | Test whether sharing cards or decks helps people play together |
| 8 — AI | Possible later | Explore assisted deck creation only after content quality rules are proven |

See [PROJECT_PLAN.md](PROJECT_PLAN.md) for the product plan and [TODO.md](TODO.md) for the implementation checklist. Later phases have not been built.

## Play the current app

1. Choose **English** or **简体中文**, then pick Casual, Funny, Deep, or Dating. Each deck has 20 questions in both languages.
2. Press **Start playing**, read the question aloud, and answer in person.
3. Press **Next card**, or swipe left on the card. Swipe right or press **Previous** to reread a card.
4. Use **Restart deck** for a fresh shuffle, or **Change deck** to choose another deck.

The app shows progress within the current 20-card cycle. Cards do not repeat within a cycle; after the last card, the deck reshuffles automatically. Revisiting a previous card preserves the remaining shuffle order and any revealed follow-up.

Some cards now show a short instruction for who answers. Cards with a follow-up show **Keep talking**; tap it only if the group wants another prompt. Cards without these additions remain ordinary question cards.

There are no typed answers, accounts, database, AI APIs, payments, analytics, or multiplayer networking.

## Why conversation quality comes next

A question can start a conversation, but a short answer can also end it. The next experiment is to see whether a small amount of guidance helps people react, tell stories, and include others without making the game feel like a questionnaire.

An enhanced conversation card can have three visible parts:

```text
Question          What is a small thing that made your day better?
Answer mode       Everyone answers.
Optional follow-up Which answer surprised you most?
```

The prototype supports **Your turn**, **Everyone answers**, **Choose someone**, **Pass the phone**, **React**, and **Vote** cues. These are instructions for people in the room, not digital response forms. Follow-ups are short, optional, and used only on selected cards.

Cards may also need a rough light → personal → deeper progression. This is a hypothesis to test: a fully random sequence can create an abrupt change in tone. The current game still shuffles cards randomly.

### Phase 3 prototype and test

- Seven cards in each deck have been selected for the enhanced sample: 28 total. The other 52 remain question-only cards.
- Enhanced cards can use one of six spoken interaction cues: **Your turn**, **Everyone answers**, **Choose someone**, **Pass the phone**, **One person answers and others react**, or **Everyone chooses and explains**.
- Nineteen of the enhanced cards have one optional, short follow-up. The follow-up is hidden until **Keep talking** is pressed.
- Intensity is metadata: `1` = light, `2` = personal, `3` = deeper. It is not shown on the card or used to change the existing random draw order.
- Compare question-only and enhanced cards in real conversations. Observe whether people keep talking, involve others, feel comfortable, and need to look at the phone less.
- Keep the elements that help. Revise or remove guidance that feels forced before expanding the card library.

This is an experiment. The prototype does **not** establish that enhanced cards improve conversation.

Enhanced card IDs: `casual-001`, `002`, `004`, `006`, `008`, `011`, `018`; `funny-001`, `002`, `003`, `006`, `010`, `015`, `020`; `deep-001`, `002`, `003`, `004`, `010`, `014`, `017`; `dating-001`, `002`, `004`, `006`, `007`, `012`, `015` (each abbreviated ID uses its deck prefix).

## Languages and content architecture

The app supports `en` and `zh-CN`. On first visit, a browser language beginning with `zh` selects Simplified Chinese; other browser languages use English. A manual choice is stored in `localStorage` under `social-icebreaker-language` and takes priority on later visits. Switching language while playing keeps the selected deck, current card, progress, history, and revealed follow-up.

UI strings are centralized in `src/data/localization.ts`; interaction instructions are in `src/data/interactionModes.ts`. All 80 Chinese questions and all 19 Chinese follow-ups are keyed by stable card ID in `src/data/cardTranslations.ts`. One card record holds localized text rather than duplicating the card for each language. If a Chinese text entry is absent or blank, the `localize` helper shows its English text.

The card type remains small and supports both basic and enhanced cards:

```ts
type Card = {
  id: string;
  deck: Deck;
  question: { en: string; "zh-CN"?: string };
  interaction?: "you" | "everyone" | "choose" | "pass" | "react" | "vote";
  followUp?: { en: string; "zh-CN"?: string };
  intensity?: 1 | 2 | 3;
};
```

The conversation fields remain optional, so basic cards still render normally. More languages can be added later without changing the card UI; no other languages, locale routing, translation service, or account system has been added. Chinese wording is an initial editorial pass and still needs review with real players.

## Product guardrails

- Encourage speaking, listening, taking turns, and following a story.
- Keep the question as the main visual element and controls easy to use with one hand.
- Let a good conversation continue; players should not feel pressured to draw another card immediately.
- Avoid required typed answers, scoring personal responses, excessive game mechanics, and complicated setup.
- Prefer better questions and tested interaction patterns to a larger card count or more technology.

## Technology and local setup

Next.js App Router, React, TypeScript, and Tailwind CSS. Cards and game state are local; there is no external state library or backend service.

Requires a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run typecheck # TypeScript check
npm run build     # production build
npm run start     # serve a production build
```

## Project structure

```text
src/
  app/          Page, layout, and global styles
  components/   StartScreen, DeckSelector, Card
  data/         Local decks and questions
  types/        Card and deck types
PROJECT_PLAN.md  Product plan
TODO.md          Phased checklist
```

## Development log

- **Phase 1:** Added four starter decks, local data, random drawing without repeats within a cycle, and a responsive card screen.
- **Phase 2:** Added progress, bounded card history, Previous, Restart Deck, Change Deck, touch swipes, and a brief transition that respects reduced-motion settings.
- **Phase 3 prototype:** Enhanced seven existing cards per deck with spoken interaction cues, optional revealable follow-ups, and intensity metadata. Basic cards and the current draw flow remain available.
- **Phase 4 foundation:** Added `en` and `zh-CN` interface and card content, browser-language detection, saved language preference, and English fallback. Language switching preserves the game state.

## Recommended next test

Play several rounds with English and Chinese-speaking groups on a phone. Check the tone of Chinese questions and cues, and compare question-only and enhanced cards. Verify first-visit browser detection, saved language preference, switching language mid-game, follow-up reveal, Previous, Next, restart, deck changes, swipes, progress, and narrow-screen readability. Record observations manually; no analytics service is needed.
