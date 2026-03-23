/* ── SPACED REPETITION (SM-2) — DUAL TRACK ──
 *
 * Each word has two independent SM-2 tracks:
 *   rec* — Recognition (Farsi → German)  passive, learned first
 *   pro* — Production  (German → Farsi)  active,  unlocks after PRODUCTION_THRESHOLD correct rec answers
 *
 * Interval sequence on correct (q=5, EF grows +0.1 per correct, capped at 3.0):
 *   rep 1 → 1 day | rep 2 → 4 days | rep 3+ → round(prev × EF)
 *   e.g. 1 → 4 → 10 → 27 → 76 → 228 days
 *
 * On incorrect: reps reset to 0, interval = 1 day, EF -= 0.2
 *
 * Production unlocks the day after the 3rd consecutive correct recognition answer.
 */

const SRS_KEY             = 'farsi_srs';
const PRODUCTION_THRESHOLD = 3;   // recognition reps needed to unlock production

/* ── Storage ── */
function loadSRS() {
  try {
    const raw = JSON.parse(localStorage.getItem(SRS_KEY)) || {};
    const out = {};
    for (const [id, entry] of Object.entries(raw)) out[id] = _migrate(entry);
    return out;
  } catch { return {}; }
}

function saveSRS(data) {
  localStorage.setItem(SRS_KEY, JSON.stringify(data));
}

/* Migrate old single-track format { ef, interval, reps, nextReview } */
function _migrate(e) {
  if (e && 'ef' in e && !('recEF' in e)) {
    return {
      recEF: e.ef, recInterval: e.interval, recReps: e.reps, recNextReview: e.nextReview,
      proEF: 2.5,  proInterval: 0,          proReps: 0,       proNextReview: null,
    };
  }
  return e;
}

function _defaultEntry() {
  return {
    recEF: 2.5, recInterval: 0, recReps: 0, recNextReview: null,
    proEF: 2.5, proInterval: 0, proReps: 0, proNextReview: null,
  };
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/* ── Core SM-2 update ──
 * direction: 'recognition' | 'production'
 * correct:    true (Got it) | false (Hard)
 */
function updateSRS(cardId, correct, direction) {
  const data = loadSRS();
  const e    = data[cardId] || _defaultEntry();
  const p    = direction === 'production' ? 'pro' : 'rec';

  if (correct) {
    /* Interval: 1 → 4 → round(prev × EF) */
    if      (e[p + 'Reps'] === 0) e[p + 'Interval'] = 1;
    else if (e[p + 'Reps'] === 1) e[p + 'Interval'] = 4;
    else                           e[p + 'Interval'] = Math.round(e[p + 'Interval'] * e[p + 'EF']);

    /* EF grows slightly with each perfect answer, capped at 3.0 */
    e[p + 'EF']   = Math.min(3.0, Math.max(1.3, e[p + 'EF'] + 0.1));
    e[p + 'Reps'] += 1;

    /* Unlock production the day after the 3rd consecutive correct recognition */
    if (direction === 'recognition' && e.recReps === PRODUCTION_THRESHOLD && !e.proNextReview) {
      const tmrw = new Date();
      tmrw.setDate(tmrw.getDate() + 1);
      e.proNextReview = tmrw.toISOString().slice(0, 10);
    }
  } else {
    e[p + 'Reps']     = 0;
    e[p + 'Interval'] = 1;
    e[p + 'EF']       = Math.max(1.3, e[p + 'EF'] - 0.2);
  }

  /* Schedule next review */
  const next = new Date();
  next.setDate(next.getDate() + e[p + 'Interval']);
  e[p + 'NextReview'] = next.toISOString().slice(0, 10);

  data[cardId] = e;
  saveSRS(data);
}

/* ── Build the due pool for a session ──
 * Returns an array of { card, direction } objects.
 * - Recognition: always active; new cards (recNextReview===null) are included.
 * - Production:  active only once proNextReview has been set (after threshold).
 */
function getDuePool(pool) {
  const data  = loadSRS();
  const today = todayStr();
  const items = [];

  pool.forEach(card => {
    const e = data[card.id] || _defaultEntry();

    /* Recognition due: never seen OR review date reached */
    if (!e.recNextReview || e.recNextReview <= today) {
      items.push({ card, direction: 'recognition' });
    }

    /* Production due: unlocked AND review date reached */
    if (e.proNextReview && e.proNextReview <= today) {
      items.push({ card, direction: 'production' });
    }
  });

  return items;
}

/* ── Stats for the info bar ── */
function getSRSStats() {
  const data  = loadSRS();
  const today = todayStr();
  let recDue = 0, proDue = 0, learned = 0;

  VOCAB.forEach(v => {
    const e = data[v.id];
    if (e && e.recReps > 0) learned++;
    if (!e || !e.recNextReview || e.recNextReview <= today) recDue++;
    if (e && e.proNextReview && e.proNextReview <= today)   proDue++;
  });

  return { recDue, proDue, learned, newCards: VOCAB.length - learned };
}
