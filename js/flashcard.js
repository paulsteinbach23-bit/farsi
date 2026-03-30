/* ── FLASHCARD STATE ── */
let fcDeck = [], fcIdx = 0, fcFlipped = false, fcCorrect = 0, fcDone = 0;
let fcActiveLessonIdx = 0;
let fcSessionHasHard = false;
let fcLessonCardsDone = new Set(); // IDs of lesson cards answered "Got it" this session

/* ── Shuffle helper ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Session builder ── */
function startLessonSession(idx) {
  fcActiveLessonIdx = idx;
  fcSessionHasHard  = false;
  fcLessonCardsDone = new Set();

  const isMastered  = getLessonStatus(idx) === 'mastered';
  const lessonWords = getLessonWords(idx);
  const count       = isMastered ? 15 : lessonWords.length; // 15 for review, all 20 for unmastered
  const sample      = shuffle(lessonWords).slice(0, count);
  const lessonItems = sample.map(card => ({ card, direction: 'recognition', isLesson: true }));

  const reviewPool  = getReviewPool(idx);
  const reviewItems = shuffle(reviewPool).slice(0, Math.min(5, reviewPool.length))
    .map(card => ({ card, direction: 'recognition', isLesson: false }));

  fcDeck    = shuffle([...lessonItems, ...reviewItems]);
  fcIdx     = 0;
  fcFlipped = false;
  fcCorrect = 0;
  fcDone    = 0;

  document.getElementById('fc-done-msg').style.display  = 'none';
  document.getElementById('flipcard').style.display     = 'block';
  document.getElementById('fc-actions').style.display   = 'none';

  updateFlashStats();
  updateLessonLabel();
  showCurrentCard();

  // Navigate to flashcard screen
  show('flash', document.getElementById('nav-flash'));
}

/* ── Card rendering ── */
function showCurrentCard() {
  if (fcIdx >= fcDeck.length) { showFlashDone(); return; }

  const { card, direction, isLesson } = fcDeck[fcIdx];
  const isPro = direction === 'production';

  document.getElementById('flipcard').classList.toggle('is-production', isPro);

  const badge = document.getElementById('fc-direction-badge');
  if (badge) {
    badge.textContent = isPro ? 'Produktion' : 'Erkennung';
    badge.className   = 'fc-direction-badge ' + (isPro ? 'production' : 'recognition');
  }

  // Review badge
  const reviewBadge = document.getElementById('fc-review-badge');
  if (reviewBadge) reviewBadge.style.display = isLesson ? 'none' : 'inline-block';

  document.getElementById('fc-topic').textContent  = TOPICS.find(t => t.id === card.t)?.name || card.t || '';
  document.getElementById('fc-roman').textContent  = isPro ? card.m : card.r;
  document.getElementById('fc-hint').textContent   = isPro ? 'Wort zeigen' : 'Bedeutung zeigen';
  document.getElementById('fc-meaning').textContent = isPro ? card.r : card.m;
  document.getElementById('fc-note').textContent    = card.n || '';

  const inner = document.getElementById('flipinner');
  inner.style.transition = 'none';
  inner.classList.remove('flipped');
  inner.offsetHeight;
  inner.style.transition = '';
  fcFlipped = false;
  document.getElementById('fc-actions').style.display = 'none';
}

function flipCard() {
  if (fcIdx >= fcDeck.length) return;
  fcFlipped = !fcFlipped;
  document.getElementById('flipinner').classList.toggle('flipped', fcFlipped);
  if (fcFlipped) document.getElementById('fc-actions').style.display = 'flex';
}

/* ── Rating ── */
function rate(correct) {
  const item = fcDeck[fcIdx];
  updateSRS(item.card.id, correct, item.direction);

  if (correct) {
    fcCorrect++;
    if (item.isLesson) fcLessonCardsDone.add(item.card.id);
  } else {
    // Push a copy to the back — no skipping
    fcDeck.push({ ...item });
    if (item.isLesson) fcSessionHasHard = true;
  }

  fcDone++;
  fcIdx++;
  incrementVocab();
  updateFlashStats();
  showCurrentCard();
}

/* ── Stats ── */
function updateFlashStats() {
  const total = fcDeck.length || 1;
  document.getElementById('fc-done').textContent    = fcDone;
  document.getElementById('fc-correct').textContent = fcCorrect;
  document.getElementById('fc-left').textContent    = Math.max(0, total - fcDone);
  document.getElementById('fc-prog').style.width    = Math.round(fcDone / total * 100) + '%';
}

function updateLessonLabel() {
  const label = document.getElementById('fc-lesson-label');
  if (!label) return;
  const lesson = getActiveLessons()[fcActiveLessonIdx];
  if (lesson) label.textContent = `Lektion ${fcActiveLessonIdx + 1} · ${lesson.theme}`;
}

/* ── End states ── */
function showFlashDone() {
  document.getElementById('flipcard').style.display    = 'none';
  document.getElementById('fc-actions').style.display  = 'none';
  document.getElementById('fc-done-msg').style.display = 'block';

  const lessonWords  = getLessonWords(fcActiveLessonIdx);
  const allGotIt     = lessonWords.length > 0 && lessonWords.every(w => fcLessonCardsDone.has(w.id));
  const alreadyMaster = getLessonStatus(fcActiveLessonIdx) === 'mastered';
  const justMastered = allGotIt && !fcSessionHasHard && !alreadyMaster;

  if (justMastered) {
    markMastered(fcActiveLessonIdx);
    buildLessonsScreen();
    document.getElementById('fc-score-msg').textContent = '⭐ Lektion gemeistert! Nächste Lektion freigeschaltet.';
  } else {
    const pct = fcDeck.length ? Math.round(fcCorrect / fcDeck.length * 100) : 0;
    document.getElementById('fc-score-msg').textContent = `${fcCorrect} / ${fcDeck.length} richtig (${pct}%)`;
  }
}

function restartFlash() { startLessonSession(fcActiveLessonIdx); }
