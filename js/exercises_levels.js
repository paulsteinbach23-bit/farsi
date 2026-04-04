/* ── EXERCISE LEVEL DEFINITIONS ── */
/* Tasks will be filled in Step 7. Structure per task:
   Typ 1: { type:1, de:'...', tiles:['...'], solution:['...'], explanation:'...' }
   Typ 2: { type:2, sentence:'...___...', de:'...', options:['...'], correct:'...', explanation:'...' }
   Typ 5: { type:5, farsi:'...', options:['...'], correct:'...', explanation:'...' }
   Typ 6: { type:6, prompt:'...', options:['...'], correct:'...', explanation:'...' }
*/

const EXERCISE_LEVELS = [
  /* ── PHASE 1: Fundament (Level 1–10) ── */
  { id:  1, title: 'Erste Schritte',        phase: 1, tasks: [] },
  { id:  2, title: 'Ich bin…',              phase: 1, tasks: [] },
  { id:  3, title: 'Meine Familie',         phase: 1, tasks: [] },
  { id:  4, title: 'Wie viele?',            phase: 1, tasks: [] },
  { id:  5, title: 'Wo ist…?',              phase: 1, tasks: [] },
  { id:  6, title: 'Farben & Adjektive',    phase: 1, tasks: [] },
  { id:  7, title: 'Essen & Trinken I',     phase: 1, tasks: [] },
  { id:  8, title: 'Ezâfe Grundlagen',      phase: 1, tasks: [] },
  { id:  9, title: 'Mein, dein, sein…',     phase: 1, tasks: [] },
  { id: 10, title: 'Phase-1-Wiederholung',  phase: 1, tasks: [] },

  /* ── PHASE 2: Aufbau (Level 11–25) ── */
  { id: 11, title: 'Ich gehe, du gehst',    phase: 2, tasks: [] },
  { id: 12, title: 'Das mi-Präfix',         phase: 2, tasks: [] },
  { id: 13, title: 'Das Buch — râ!',        phase: 2, tasks: [] },
  { id: 14, title: 'Plural mit -hâ',        phase: 2, tasks: [] },
  { id: 15, title: 'Im Restaurant',         phase: 2, tasks: [] },
  { id: 16, title: 'Einkaufen',             phase: 2, tasks: [] },
  { id: 17, title: 'Unregelmäßige Verben I',phase: 2, tasks: [] },
  { id: 18, title: 'Fehler finden I',       phase: 2, tasks: [] },
  { id: 19, title: 'Reisen & Transport',    phase: 2, tasks: [] },
  { id: 20, title: 'Uhrzeit & Datum',       phase: 2, tasks: [] },
  { id: 21, title: 'Körper & Gesundheit',   phase: 2, tasks: [] },
  { id: 22, title: 'Unregelmäßige Verben II',phase: 2, tasks: [] },
  { id: 23, title: 'Ezâfe-Ketten',          phase: 2, tasks: [] },
  { id: 24, title: 'râ vertieft',           phase: 2, tasks: [] },
  { id: 25, title: 'Phase-2-Wiederholung',  phase: 2, tasks: [] },

  /* ── PHASE 3: Konsolidierung (Level 26–30) ── */
  { id: 26, title: 'Was ich gestern tat',   phase: 3, tasks: [] },
  { id: 27, title: 'Ich will nicht…',       phase: 3, tasks: [] },
  { id: 28, title: 'Modalverben',           phase: 3, tasks: [] },
  { id: 29, title: 'Fehler finden II',      phase: 3, tasks: [] },
  { id: 30, title: 'Langer Weg',           phase: 3, tasks: [] },
];
