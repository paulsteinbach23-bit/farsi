# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

```bash
open index.html      # macOS
xdg-open index.html  # Linux
```

No build step, no server, no dependencies. The entire app is `index.html`.

## Architecture

Everything lives in a single file (`index.html`) with three sections:

1. **`<style>`** — all CSS using CSS custom properties (`--bg`, `--purple-400`, etc.) with a full dark-mode override via `@media (prefers-color-scheme: dark)`.

2. **HTML** — five `<div id="…" class="screen">` panels (flash, vocab, grammar, sentences, phrases). Navigation swaps the `active` class via `show(id, btn)`. Content in vocab/grammar/exercises/phrases is injected by JS at init; only the flashcard panel is fully static HTML.

3. **`<script>`** — structured as DATA → feature modules → init:
   - `VOCAB` array — `{id, r, m, t, n}` (romanized, German meaning, topic id, memory note)
   - `TOPICS` array — `{id, name, icon}` — topic metadata for vocab grid
   - `GRAMMAR` array — `{title, rule, examples:[{r,m}]}`
   - `EXERCISES` array — `{q, ans, hint}` — `q` contains a literal `___` placeholder replaced with `<input>` at render time
   - `PHRASES` object — keyed by category string, values are `[{r, d}]`
   - Flashcard state is module-level `let` vars (`fcDeck`, `fcIdx`, `fcFlipped`, `fcCorrect`, `fcDone`, `fcFilter`)
   - No framework, no module system — all functions are global

## Content conventions

- All Farsi is **romanized only** (no Persian script).
- Translations and memory notes are in **German** (target learner is a German speaker).
- Topic IDs: `greetings | food | travel | daily`
- The `n` field on a vocab entry is optional but encouraged — use it for German cognates or cultural context.
- Exercise answers are case-insensitive (`checkEx` lowercases both sides before comparing).

## Key constraints

- **Offline-first, single-file** — do not introduce external fetches, CDN links, or a build pipeline unless explicitly asked.
- No persistence between sessions (yet) — `localStorage` is the planned mechanism for future SRS and course-progress features.
