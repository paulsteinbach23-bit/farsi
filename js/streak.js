/* ── STREAK (pro Sprache) ──
   Jede Sprache hat ihren eigenen Streak und ihr eigenes Tagesziel:
   Farsi und Spanisch 15 Karten + 1 Übungslevel, Französisch 15 Karten.
   Der bisherige gemeinsame Streak ('farsi_streak') läuft als Farsi-Streak weiter. */
const STREAK_KEYS   = { farsi: 'farsi_streak', spanish: 'spanish_streak', french: 'french_streak' };
const VOCAB_GOAL    = 15;
const EXERCISE_GOALS = { farsi: 1, spanish: 1, french: 0 };

let _streakJustExtended = false;
let _newStreakValue      = 0;

function _lang() { return (typeof currentLang !== 'undefined' && STREAK_KEYS[currentLang]) ? currentLang : 'farsi'; }
function exerciseGoal(lang) { return EXERCISE_GOALS[lang || _lang()] || 0; }

/* ── Storage ── */
function loadStreakData(lang) {
  try {
    return JSON.parse(localStorage.getItem(STREAK_KEYS[lang || _lang()])) || _defaultStreakData();
  } catch { return _defaultStreakData(); }
}

function _defaultStreakData() {
  return { streak: 0, lastStreakDate: null, todayDate: null, todayVocab: 0, todayExercises: 0 };
}

function saveStreakData(s, lang) {
  localStorage.setItem(STREAK_KEYS[lang || _lang()], JSON.stringify(s));
}

/* Lokales Datum (nicht UTC) – sonst beginnt der neue Tag erst um 1/2 Uhr nachts */
function _today() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function _dayDiff(a, b) {
  const [ya, ma, da] = a.split('-').map(Number);
  const [yb, mb, db] = b.split('-').map(Number);
  return Math.round((Date.UTC(ya, ma - 1, da) - Date.UTC(yb, mb - 1, db)) / 86400000);
}

/* Resets daily counters when date changes, breaks streak if a day was missed */
function _refreshDay(s) {
  const today = _today();
  if (s.todayDate !== today) {
    if (s.streak > 0 && s.lastStreakDate && _dayDiff(today, s.lastStreakDate) > 1) s.streak = 0;
    s.todayDate      = today;
    s.todayVocab     = 0;
    s.todayExercises = 0;
  }
  return s;
}

function goalMet(s, lang) {
  return s.todayVocab >= VOCAB_GOAL && s.todayExercises >= exerciseGoal(lang);
}

/* Check if today's goal was just met for the first time */
function _checkGoal(s, lang) {
  const today = _today();
  if (goalMet(s, lang) && s.lastStreakDate !== today) {
    s.streak        = s.streak > 0 ? s.streak + 1 : 1;
    s.lastStreakDate = today;
    _streakJustExtended = true;
    _newStreakValue      = s.streak;
  }
}

/* ── Public API ── */
function initStreak() {
  const lang = _lang();
  const s = _refreshDay(loadStreakData(lang));
  saveStreakData(s, lang);
  renderStreakBadge(s);
}

function _bump(field) {
  const lang = _lang();
  const s = _refreshDay(loadStreakData(lang));
  s[field]++;
  _checkGoal(s, lang);
  saveStreakData(s, lang);
  renderStreakBadge(s);
  _handleStreakExtension();
  if (typeof reportProgress === 'function') reportProgress(lang, s, goalMet(s, lang));
}

function incrementVocab()     { _bump('todayVocab'); }
function incrementExercises() { _bump('todayExercises'); }

function _handleStreakExtension() {
  if (!_streakJustExtended) return;
  _streakJustExtended = false;
  flickerFlame();
  if (_newStreakValue === 7)  showStreakMilestone('Eine Woche am Stück! 🔥');
  if (_newStreakValue === 30) showStreakMilestone('30 Tage Streak — unglaublich! 🔥');
}

/* ── UI ── */
function renderStreakBadge(s) {
  const el = document.getElementById('streak-count');
  if (el) el.textContent = s.streak;
  renderDailyProgress(s);
}

function renderDailyProgress(s) {
  const el = document.getElementById('daily-progress');
  if (!el) return;

  const EXERCISE_GOAL = exerciseGoal();
  const vCount  = Math.min(s.todayVocab,     VOCAB_GOAL);
  const eCount  = Math.min(s.todayExercises, EXERCISE_GOAL);
  const vPct    = Math.round(vCount / VOCAB_GOAL    * 100);
  const ePct    = EXERCISE_GOAL ? Math.round(eCount / EXERCISE_GOAL * 100) : 100;
  const vDone   = s.todayVocab     >= VOCAB_GOAL;
  const eDone   = s.todayExercises >= EXERCISE_GOAL;

  el.innerHTML = `
    <div class="dp-item">
      <div class="dp-label">
        <span>Vokabeln</span>
        <span class="dp-count ${vDone ? 'dp-done' : ''}">${vDone ? '✓' : `${s.todayVocab} / ${VOCAB_GOAL}`}</span>
      </div>
      <div class="dp-track">
        <div class="dp-fill ${vDone ? 'dp-fill-done' : ''}" style="width:${vPct}%"></div>
      </div>
    </div>
    ${EXERCISE_GOAL ? `<div class="dp-item">
      <div class="dp-label">
        <span>Übungen</span>
        <span class="dp-count ${eDone ? 'dp-done' : ''}">${eDone ? '✓' : `${s.todayExercises} / ${EXERCISE_GOAL}`}</span>
      </div>
      <div class="dp-track">
        <div class="dp-fill ${eDone ? 'dp-fill-done' : ''}" style="width:${ePct}%"></div>
      </div>
    </div>` : ''}
  `;
}

function flickerFlame() {
  const badge = document.getElementById('streak-badge');
  if (!badge) return;
  badge.classList.remove('streak-flicker');
  void badge.offsetWidth;   // force reflow to restart animation
  badge.classList.add('streak-flicker');
}

function showStreakMilestone(msg) {
  const el = document.createElement('div');
  el.className   = 'streak-milestone';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
