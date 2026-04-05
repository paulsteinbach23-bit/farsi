/* ── STREAK ── */
const STREAK_KEY    = 'farsi_streak';
const VOCAB_GOAL    = 15;
const EXERCISE_GOAL = 1;

let _streakJustExtended = false;
let _newStreakValue      = 0;

/* ── Storage ── */
function loadStreakData() {
  try {
    return JSON.parse(localStorage.getItem(STREAK_KEY)) || _defaultStreakData();
  } catch { return _defaultStreakData(); }
}

function _defaultStreakData() {
  return { streak: 0, lastStreakDate: null, todayDate: null, todayVocab: 0, todayExercises: 0 };
}

function saveStreakData(s) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(s));
}

function _today() {
  return new Date().toISOString().slice(0, 10);
}

/* Resets daily counters when date changes, breaks streak if a day was missed */
function _refreshDay(s) {
  const today = _today();
  if (s.todayDate !== today) {
    if (s.streak > 0 && s.lastStreakDate) {
      const diffDays = (new Date(today) - new Date(s.lastStreakDate)) / 86400000;
      if (diffDays > 1) s.streak = 0;   // missed at least one day
    }
    s.todayDate      = today;
    s.todayVocab     = 0;
    s.todayExercises = 0;
  }
  return s;
}

/* Check if today's goal was just met for the first time */
function _checkGoal(s) {
  const today = _today();
  if (s.todayVocab >= VOCAB_GOAL && s.todayExercises >= EXERCISE_GOAL && s.lastStreakDate !== today) {
    s.streak        = s.streak > 0 ? s.streak + 1 : 1;
    s.lastStreakDate = today;
    _streakJustExtended = true;
    _newStreakValue      = s.streak;
  }
}

/* ── Public API ── */
function initStreak() {
  const s = _refreshDay(loadStreakData());
  saveStreakData(s);
  renderStreakBadge(s);
}

function incrementVocab() {
  const s = _refreshDay(loadStreakData());
  s.todayVocab++;
  _checkGoal(s);
  saveStreakData(s);
  renderStreakBadge(s);
  _handleStreakExtension();
}

function incrementExercises() {
  const s = _refreshDay(loadStreakData());
  s.todayExercises++;
  _checkGoal(s);
  saveStreakData(s);
  renderStreakBadge(s);
  _handleStreakExtension();
}

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

  const vCount  = Math.min(s.todayVocab,     VOCAB_GOAL);
  const eCount  = Math.min(s.todayExercises, EXERCISE_GOAL);
  const vPct    = Math.round(vCount / VOCAB_GOAL    * 100);
  const ePct    = Math.round(eCount / EXERCISE_GOAL * 100);
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
    <div class="dp-item">
      <div class="dp-label">
        <span>Übungen</span>
        <span class="dp-count ${eDone ? 'dp-done' : ''}">${eDone ? '✓' : `${s.todayExercises} / ${EXERCISE_GOAL}`}</span>
      </div>
      <div class="dp-track">
        <div class="dp-fill ${eDone ? 'dp-fill-done' : ''}" style="width:${ePct}%"></div>
      </div>
    </div>
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
