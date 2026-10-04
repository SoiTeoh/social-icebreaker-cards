# TODO

## Phase 1 — Prototype (completed)

- [x] Set up Next.js, React, TypeScript, and Tailwind CSS.
- [x] Define local card data and four decks with 20 questions each.
- [x] Build responsive start screen, deck selector, and question card.
- [x] Add shuffled drawing, no repeats within a cycle, and automatic reshuffle.
- [x] Confirm installation, type checking, and production build.

## Phase 2 — Playability (completed; manual playtest pending)

- [x] Add deck cycle progress, Previous, Restart Deck, and Change Deck.
- [x] Add touch swipe navigation without blocking vertical scrolling.
- [x] Add a subtle transition and respect reduced motion.
- [x] Handle queue exhaustion, history, and rapid button presses.
- [ ] Playtest the updated controls on a narrow phone and desktop browser.

## Phase 3 — Conversation system (implemented; conversation impact unvalidated)

- [x] Extend the card schema with optional interaction, follow-up, and intensity fields.
- [x] Enhance seven existing cards per deck; preserve question-only cards.
- [x] Centralize six spoken interaction labels and reveal optional follow-ups on demand.
- [x] Preserve follow-up reveal state when navigating card history.
- [x] Pass TypeScript checking and production build.
- [ ] Compare question-only and enhanced cards in real group conversations.
- [ ] Observe who answers, who joins, whether a story develops, and whether cues or follow-ups feel awkward.
- [ ] Check the complete flow on a narrow phone: Previous, Next, restart, deck change, swipes, progress, and follow-up reveal.

## Phase 4 — Multilingual foundation (implemented; language review pending)

- [x] Keep stable card IDs and localize questions and follow-ups within each logical card.
- [x] Translate all 80 questions and 19 follow-ups into initial Simplified Chinese.
- [x] Centralize UI, deck, and interaction-mode strings for `en` and `zh-CN`.
- [x] Add language selector, browser-language default, saved preference, and English fallback.
- [x] Preserve card and game state when switching languages.
- [x] Pass type checking and production build; verify translation coverage and fallback rules.
- [ ] Review Chinese wording with native speakers during real playtests.
- [ ] Check language detection, persistence, fallback, and the full game flow on a narrow phone.

## Phase 5 — Content expansion (future, documentation only)

- [ ] Improve and expand the library only after the conversation experiment is evaluated.

## Phase 6 — Custom decks (future, documentation only)

- [ ] Explore locally saved custom decks.

## Phase 7 — Sharing (future, documentation only)

- [ ] Test whether sharing cards or decks would help players.

## Phase 8 — AI (future, documentation only)

- [ ] Consider assisted deck creation only if card quality rules and user demand justify it.
