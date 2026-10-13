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

  document.getElementById('fc-done-msg').style.display    = 'none';
  document.getElementById('flipcard').style.display       = '';
  document.getElementById('fc-actions').style.display     = 'none';
  document.getElementById('fc-placeholder').style.display = '';

  updateFlashStats();
  updateLessonLabel();
  showCurrentCard();

  // Navigate to flashcard screen
  show('flash', document.getElementById('nav-flash'));
}

/* ── Card rendering ── */
function _setFlipped(on) {
  fcFlipped = on;
  document.getElementById('flipinner').classList.toggle('flipped', on);
  document.getElementById('flipcard').setAttribute('aria-label', on ? 'Karte zurückdrehen' : 'Karte umdrehen und Bedeutung zeigen');
  document.getElementById('fc-actions').style.display     = on ? 'flex' : 'none';
  document.getElementById('fc-placeholder').style.display = on ? 'none' : '';
}

function showCurrentCard() {
  if (fcIdx >= fcDeck.length) { showFlashDone(); return; }

  const { card, direction, isLesson } = fcDeck[fcIdx];
  const isPro    = direction === 'production';
  // Persische Schrift (Feld n) nur bei Farsi – bei Französisch/Spanisch ist n eine Notiz
  const script   = currentLang === 'farsi' ? (card.n || '') : '';
  const note     = currentLang === 'farsi' ? '' : (card.n || '');
  const topic    = (typeof TOPICS !== 'undefined' && TOPICS.find(t => t.id === card.t)?.name) || '';

  document.getElementById('flipcard').classList.toggle('is-production', isPro);
  document.getElementById('flipcard').classList.toggle('has-script', !!script && !isPro);

  const badge = document.getElementById('fc-direction-badge');
  badge.textContent = (isPro ? 'Produzieren' : 'Erkennen') + (isLesson ? '' : ' · Wiederholung');

  document.getElementById('fc-topic').textContent      = topic;
  document.getElementById('fc-topic-back').textContent = topic;

  // Vorderseite
  document.getElementById('fc-script').textContent = isPro ? '' : script;
  document.getElementById('fc-roman').textContent  = isPro ? card.m : card.r;
  // Rückseite
  document.getElementById('fc-back-script').textContent = script;
  document.getElementById('fc-back-roman').textContent  = card.r;
  document.getElementById('fc-meaning').textContent     = card.m;
  document.getElementById('fc-note').textContent        = note;

  const inner = document.getElementById('flipinner');
  inner.style.transition = 'none';
  _setFlipped(false);
  inner.offsetHeight;
  inner.style.transition = '';
}

function flipCard() {
  if (fcIdx >= fcDeck.length) return;
  _setFlipped(!fcFlipped);
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
  const total = fcDeck.length;
  const answered = fcDeck.slice(0, fcIdx);
  const nNew = answered.filter(i => i.isLesson).length;
  const nRev = answered.length - nNew;
  const nOpen = Math.max(0, total - answered.length);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('fc-done-count', answered.length);
  set('fc-total', total);
  set('fc-n-new', nNew);
  set('fc-n-rev', nRev);
  set('fc-n-open', nOpen);
  // flex-grow statt Breite: Segmente teilen sich den Balken anteilig
  document.getElementById('fc-seg-new').style.flexGrow  = nNew;
  document.getElementById('fc-seg-rev').style.flexGrow  = nRev;
  document.getElementById('fc-seg-open').style.flexGrow = nOpen;
}

function updateLessonLabel() {
  const lesson = getActiveLessons()[fcActiveLessonIdx];
  if (!lesson) return;
  document.getElementById('fc-lesson-num').textContent   = `Lektion ${fcActiveLessonIdx + 1}`;
  document.getElementById('fc-lesson-theme').textContent = lesson.theme;
}

/* ── End states ── */
function showFlashDone() {
  document.getElementById('flipcard').style.display       = 'none';
  document.getElementById('fc-actions').style.display     = 'none';
  document.getElementById('fc-placeholder').style.display = 'none';
  document.getElementById('fc-done-msg').style.display    = 'block';

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
