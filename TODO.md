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

## Phase B & Phase C — Quality, Automation & Final Dev Acceptance (completed 2026-11-13)

- **Status**: **MVP Development Complete — Pending Playtest** (code & automated checks done; real-group playtesting, physical-device testing, and deployment remain pending).
- [x] Eliminate first-paint English flash for Chinese browsers via synchronous `<head>` init script + `useLayoutEffect` (0 Hydration errors, 400ms fallback).
- [x] Preserve `BLOG_STATIC_EXPORT=1` config and localize the StartScreen back-to-projects link (`t.backToProjects`).
- [x] Extract pure `src/lib/gameLogic.ts` and harden `readSavedLanguage` / `saveLanguage` against `window.localStorage` getter exceptions.
- [x] Add Vitest suite (3 files, 12 tests covering shuffle, non-repeating reshuffle, history navigation/limit, localization fallback, storage error safety, and 80-card integrity).
- [x] Verify `tsc --noEmit`, `vitest run`, `next build --webpack`, and `BLOG_STATIC_EXPORT=1` static export (`out/`). Note: default Turbopack build still fails with an environment-related `TurbopackInternalError` whose root cause is not yet finally confirmed.
- [x] Verify Playwright E2E across `360×640`, `390×844`, `1280×800` and 6 first-paint language edge cases (0 console/page errors; observed ~19px vertical scroll on `360×640` during horizontal swipe, pending physical-device check).
- [ ] Real-group playtesting (conversation quality & Chinese naturalness review).
- [ ] Physical mobile device testing (Android Chrome / iOS Safari).
- [ ] Production deployment (paused until playtesting).
