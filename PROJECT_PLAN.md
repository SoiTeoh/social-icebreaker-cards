# Project plan

## Product concept

Social Icebreaker Cards is a lightweight conversation game: choose a deck, draw a question, answer it, pass the phone, and continue. The screen should give people an easy starting point and then get out of the way.

## Target use cases

Small in-person gatherings, friends, first meetings, dates, road trips, and relaxed group conversations. A single shared phone is the primary device.

## Phase 1 MVP — completed

- Mobile-first start screen with four decks: Casual, Funny, Deep, Dating.
- Twenty local questions per deck, with a large readable card and Next Card action.
- Random order without repeats within a deck cycle; automatically reshuffle after all cards have appeared, avoiding an immediate duplicate.
- Responsive tablet and desktop layout.

The prototype passed installation, type checking, and production build. Manual playtesting remains the next product validation step.

## Phase 2 — playability improvements (completed; awaiting playtesting)

- Show position within the current 20-card cycle.
- Revisit previous cards without changing the remaining shuffled queue; Next moves forward through revisited cards first.
- Restart the chosen deck with a fresh shuffle or return to deck selection without reloading.
- Swipe left or right on the card on touchscreens, with a threshold that leaves vertical scrolling alone.
- Use a short, reduced-motion-aware card entrance and keep secondary controls quieter than the question.

## Phase 3 — conversation system (implemented; conversation impact unvalidated)

Seven existing cards per deck now include a spoken interaction cue and intensity metadata; 19 also include one optional follow-up. The remaining 52 cards retain the question-only format. The six cues are `you`, `everyone`, `choose`, `pass`, `react`, and `vote`. A follow-up appears only after the player taps **Keep talking**. Its revealed state stays with that drawn card when the player uses Previous and Next.

Intensity uses `1` for light, `2` for personal, and `3` for deeper. It is metadata for later testing; the existing random draw order is unchanged. This prototype has not been validated in real conversations. Manual testing should compare question-only and enhanced cards for participation, storytelling, comfort, and attention to the phone.

## Current non-goals

Accounts, authentication, database, AI, payments, analytics, multiplayer networking, profiles, community content, saved answers, and an admin dashboard. No backend service is needed. Full localization and large content expansion remain future work.

## Technical architecture

Next.js App Router, React, TypeScript, and Tailwind CSS. Cards live in `src/data/cards.ts` with stable `id` and `deck`, localized `question`, and optional `interaction`, localized `followUp`, and `intensity`. Chinese card content is keyed by ID in `src/data/cardTranslations.ts`; UI and interaction copy are centralized in `src/data/localization.ts` and `src/data/interactionModes.ts`. The page holds a small local game state: chosen deck, remaining shuffled cards, bounded drawn-card history, current history position, and follow-up reveal state for each drawn card. Language preference is the only localStorage value. No backend or external state library.

## Phase 4 — multilingual foundation (implemented; language review pending)

The app now supports English (`en`) and Simplified Chinese (`zh-CN`) without accounts or locale routing. Card IDs and deck IDs remain stable. Each card has one logical record with localized question and optional follow-up text. Interface text and interaction labels are centralized separately from card content. The browser language selects the first-visit default; a saved manual choice overrides it. Missing Chinese card text falls back to English. Switching language does not reset the game.

All 80 questions and 19 follow-ups have initial Chinese translations. Their naturalness and cultural fit still require review with real players.

## Future roadmap — documentation only

1. **Phase 5: Content expansion.** Improve and expand the card library after conversation patterns are validated.
2. **Phase 6: Custom decks.** Explore locally saved personal decks before considering accounts.
3. **Phase 7: Sharing.** Explore card or deck sharing if it serves actual use.
4. **Phase 8: AI.** Consider assisted deck creation only after quality rules are proven.

Future languages such as Spanish or Japanese should be considered only after demand and editorial review, using the same stable card IDs and separate UI/content dictionaries.

## Development log

- **Phase 1:** Four decks, local data, random non-repeating draws, and responsive play screen.
- **Phase 2:** Added progress, Previous, Restart Deck, Change Deck, touch swipes, and a subtle transition. Kept all gameplay state local to the page.
- **Phase 3 prototype:** Added optional interaction, follow-up, and intensity metadata to 28 existing cards. Follow-ups are revealed on demand; basic cards still show only the question. Human playtesting is pending.
- **Phase 4 foundation:** Added English and Simplified Chinese UI, deck labels, 80 question translations, 19 follow-up translations, browser-language detection, local preference, and English fallback. Chinese content review remains pending.

## Long-term possibilities

A curated library of conversation prompts, creator decks, optional AI-assisted deck creation, and paid packs are possibilities only after the core experience proves useful. Each would require its own product validation and technical plan.
