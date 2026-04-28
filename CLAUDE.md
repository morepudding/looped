# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (requires Node.js 22+)
npm run build     # TypeScript check + Vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test suite configured.

## Architecture

**Spark** is a single-page dating simulation game built with React + TypeScript + Vite. The entire app state lives in `App.tsx` — no external state manager.

### View system

`App.tsx` manages a `view` state of type `View = 'feed' | 'chat' | 'home' | 'settings-main' | 'settings-wifi' | 'dev'`. The UI conditionally renders one of these views. There's also an implicit visual-novel mode when `currentStep.isPhysical === true` (renders `vn-container` instead of `chat-container`).

Clicking the home indicator bar (bottom) navigates to `'home'`, which is an iPhone home screen simulation with app icons.

### Data flow

`src/data/profiles.ts` → array of `Profile` objects, each with a `scenarioId`  
`src/data/scenarios.ts` → `Record<string, Scenario>` keyed by `scenarioId`  
`src/types.ts` → shared interfaces

When the user clicks "Matcher" on a profile, `handleMatch()` loads the scenario, sets `currentStepId` to the scenario's `startStepId`, and begins displaying `girlMessages` with timed delays.

### Scenario engine

Each `Step` has:
- `girlMessages`: array of chat bubbles displayed sequentially
- `choices`: buttons the player clicks; each has `nextStepId`, `interestDelta`, and optional `reactionMessages`
- `inputType: 'text'` + `expectedAnswer`: activates a free-text input (used for the WiFi challenge — the player must navigate to the in-app Settings > Wi-Fi screen and find `"WiFi-de-Lea"`)
- `isPhysical`: switches to visual-novel rendering mode

`interestScore` (0–10) tracks the girl's interest. Reaching 0 triggers a ghost/reset; reaching END with score ≥ 8 shows a win message.

`isFastMode` (toggle in status bar) sets all `setTimeout` delays to 0 — useful during development.

### Image generation

Scene images are fetched from `https://image.pollinations.ai/prompt/{encodedPrompt}` with a `seed` parameter. Each `Profile` has an optional `masterSeed` that ensures visual consistency of the character across all steps of a scenario.

### DevDashboard (`src/components/DevDashboard.tsx`)

Accessible via the "Director" app icon on the home screen. Lets you:
1. Pick a character
2. Browse 10 random face seeds and lock one as the `masterSeed`
3. Preview all scenario step images side-by-side with that seed

The `handleSaveImage` function is referenced but not fully implemented in the current codebase.

### Adding a new scenario

1. Add a `Profile` entry to `src/data/profiles.ts` with a unique `id` and `scenarioId`
2. Add the corresponding `Scenario` to `src/data/scenarios.ts` under the same key
3. Profile images use Unsplash URLs or the pollinations.ai generator (see Léa's profile for the generator pattern)
4. New profiles are locked by default — add their `id` to `unlockedIds` in `App.tsx` to make them playable
