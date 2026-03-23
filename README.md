# فارسی — Farsi Beginner Learning App

An offline-first Farsi learning app for German speakers. No build tools, no dependencies, no server required — open `index.html` and it runs.

## Quick start

```bash
open index.html      # macOS
xdg-open index.html  # Linux
# or just double-click index.html in your file browser
```

To use on mobile: deploy for free via [Netlify Drop](https://app.netlify.com/drop) (drag the project folder onto the page) and open the URL on your phone.

---

## Project structure

```
farsi-app/
├── index.html          ← HTML shell + navigation
├── css/
│   └── style.css       ← Full design system (tokens, dark mode, all components)
├── js/
│   ├── data.js         ← All content: 200 words, 12 topics, grammar, exercises, phrases
│   ├── srs.js          ← SM-2 spaced repetition engine (dual-track: recognition + production)
│   ├── flashcard.js    ← Flashcard state, rendering, SRS integration
│   ├── alphabet.js     ← 32-letter alphabet data + canvas tracing logic
│   ├── vocab.js        ← Vocabulary tab renderer
│   ├── grammar.js      ← Grammar tab renderer
│   ├── exercises.js    ← Fill-in-the-blank exercise checker
│   ├── phrases.js      ← Phrasebook renderer
│   └── app.js          ← Navigation + init
├── data/
│   └── vocab.json      ← Source-of-truth vocabulary (mirrors js/data.js)
└── README.md
```

---

## Features

### Flashcards — SM-2 Spaced Repetition
200 vocabulary words across 12 topics. Each word has two independent learning tracks:

- **Erkennung** (Recognition) — Farsi → German. Always active; new cards start here.
- **Produktion** (Production) — German → Farsi. Unlocks automatically after 3 correct recognition answers.

The SM-2 algorithm schedules cards based on your answers:
- Correct → interval grows: 1 day → 4 days → interval × ease factor
- Hard → resets to 1 day, ease factor drops

Progress is stored in `localStorage` and persists across sessions. A toggle switches between "due today only" and "practice all."

### Vocabulary
200 words grouped by 12 topics: Greetings, Food, Travel, Daily Life, Numbers, Colors, Time, Body, Home, Verbs, Feelings, Nature. Each word has a German translation and optional memory note.

### Grammar
7 key rules explained for German speakers — sentence order (SOV), the ezâfe construction, negation, verb conjugation, and more. Each rule has romanized examples with German translations.

### Exercises
Fill-in-the-blank drills. Answer checking is diacritics-insensitive: `â == a`, `ā == a`, etc., so spelling variants are accepted as correct.

### Phrasebook
25+ survival phrases across 5 real-life categories (greetings, shopping, directions, emergencies, small talk).

### Alphabet
All 32 Persian-Arabic letters with a tracing canvas. The letter is shown as a faint guide on the canvas; the roman transcription appears in the corner. Draw over the guide with your finger or mouse to practice the script.

---

## Data format reference

### Vocabulary word (`js/data.js` → `VOCAB` array)
```js
{ id: 201, r: 'romanized', m: 'German meaning', t: 'topic-id', n: 'optional memory note' }
```
Topic IDs: `greetings` | `food` | `travel` | `daily` | `numbers` | `colors` | `time` | `body` | `home` | `verbs` | `feelings` | `nature`

### Grammar rule
```js
{
  title: 'Rule name',
  rule: 'Explanation for German speakers.',
  examples: [{ r: 'Farsi romanized', m: 'German translation' }]
}
```

### Exercise
```js
{ q: 'Sentence with ___ blank.', ans: 'answer', hint: 'helpful tip' }
```

### Phrase
```js
'Category name': [{ r: 'Farsi romanized', d: 'German translation' }]
```

---

## Possible next steps

### 1. Pronunciation guide
The hardest sounds for German speakers are `kh`, `gh`, `q`, and the `â` vowel. A dedicated tab could show a phoneme chart comparing Farsi sounds to German equivalents and use the Web Speech API to play examples, or embed links to [Forvo](https://forvo.com) recordings.

### 2. AI conversation practice
Wire up the Anthropic API to let the user chat with a patient Farsi teacher. The system prompt would instruct Claude to respond only in romanized Farsi, correct mistakes gently, and always add the German translation in parentheses. This turns the app from passive study into active speaking practice.

### 3. 30-day structured course
Add a "Course" tab with a daily curriculum: day 1–5 greetings, 6–10 numbers and time, 11–15 food and verbs, and so on. Each day shows vocabulary to learn, one grammar point, and two exercises. Track completed days in `localStorage`.

### 4. Listening comprehension
Use the Web Speech API (`speechSynthesis`) to read out the Farsi romanization (or actual Persian script). Add a "listen and type" mode where the user hears the word and must type the German meaning — testing a different memory pathway than reading.

### 5. Alphabet quiz mode
Extend the alphabet tab with a quiz: show the Arabic letter and ask the user to type the roman transcription, or vice versa. Track which letters need more practice and surface them more often (mini-SRS for the script).

### 6. Progress dashboard
A summary screen showing: total words learned, streak (days of consecutive study), SRS queue breakdown by topic, and a heatmap calendar of study activity — all derived from the existing `localStorage` data.

### 7. Export / import progress
Allow the user to download their SRS data as a JSON file and re-import it — useful for switching devices or backing up progress without a server.

---

## Technical notes

- **Offline-first**: runs as `file://`, no external fetches or CDN links.
- **No framework**: all functions are global, script load order matters (`data.js → srs.js → flashcard.js → … → app.js`).
- **Dark mode**: automatic via `@media (prefers-color-scheme: dark)` in `style.css`.
- **Romanization**: all Farsi is romanized only (no Persian script in vocabulary/grammar). `â` represents the long-a vowel.
- **Canvas drawing**: uses the Pointer Events API for cross-device mouse/touch support; `touch-action: none` prevents page scroll while tracing.

## Tested on
Chrome 124+, Firefox 125+, Safari 17+ — desktop and mobile. No internet connection required.
