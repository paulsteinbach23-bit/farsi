/* ── FLASHCARD STATE ── */
let fcDeck = [], fcIdx = 0, fcFlipped = false, fcCorrect = 0, fcDone = 0, fcFilter = 'all';
let fcSRSMode = true;

/* ── Deck building ── */
function buildDeck(filter) {
  const pool  = filter === 'all' ? getActiveVocab() : getActiveVocab().filter(v => v.t === filter);
  const items = fcSRSMode
    ? getDuePool(pool)
    : pool.map(card => ({ card, direction: 'recognition' }));

  if (fcSRSMode && items.length === 0) { showCaughtUp(); return; }

  fcDeck = [...items].sort(() => Math.random() - 0.5);
  fcIdx = 0; fcFlipped = false; fcCorrect = 0; fcDone = 0;

  document.getElementById('fc-done-msg').style.display   = 'none';
  document.getElementById('fc-caught-up').style.display  = 'none';
  document.getElementById('flipcard').style.display      = 'block';
  document.getElementById('fc-actions').style.display    = 'none';

  updateFlashStats();
  updateSRSBar();
  showCurrentCard();
}

function setFilter(f) {
  fcFilter = f;
  buildDeck(f);
}

/* ── Card rendering ── */
function showCurrentCard() {
  if (fcIdx >= fcDeck.length) { showFlashDone(); return; }

  const { card, direction } = fcDeck[fcIdx];
  const isPro = direction === 'production';

  /* Teal theme for production, purple for recognition */
  document.getElementById('flipcard').classList.toggle('is-production', isPro);

  /* Direction badge */
  const badge = document.getElementById('fc-direction-badge');
  badge.textContent = isPro ? 'Produktion' : 'Erkennung';
  badge.className   = 'fc-direction-badge ' + (isPro ? 'production' : 'recognition');

  /* Front face */
  document.getElementById('fc-topic').textContent = TOPICS.find(t => t.id === card.t)?.name || card.t || '';
  document.getElementById('fc-roman').textContent = isPro ? card.m : card.r;
  document.getElementById('fc-hint').textContent  = isPro ? (currentLang === 'french' ? 'Frz. Wort zeigen' : 'Farsi-Wort zeigen') : 'Bedeutung zeigen';

  /* Back face: swap content for production */
  document.getElementById('fc-meaning').textContent = isPro ? card.r : card.m;
  document.getElementById('fc-note').textContent    = card.n || '';

  const inner = document.getElementById('flipinner');
  inner.style.transition = 'none';
  inner.classList.remove('flipped');
  inner.offsetHeight; // force reflow so the reset is instant, not animated
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
  const { card, direction } = fcDeck[fcIdx];
  if (fcSRSMode) updateSRS(card.id, correct, direction);
  if (correct) fcCorrect++;
  fcDone++; fcIdx++;
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

function updateSRSBar() {
  const { recDue, proDue, learned, newCards } = getSRSStats();
  const parts = [];
  if (recDue > 0) parts.push(`${recDue} Erkennung`);
  if (proDue > 0) parts.push(`${proDue} Produktion`);
  if (newCards > 0) parts.push(`${newCards} neu`);
  if (learned > 0) parts.push(`${learned} gelernt`);
  document.getElementById('srs-info').textContent = parts.join(' · ');
}

/* ── End states ── */
function showFlashDone() {
  document.getElementById('flipcard').style.display    = 'none';
  document.getElementById('fc-actions').style.display  = 'none';
  document.getElementById('fc-done-msg').style.display = 'block';
  const pct = fcDeck.length ? Math.round(fcCorrect / fcDeck.length * 100) : 0;
  document.getElementById('fc-score-msg').textContent  = `${fcCorrect} / ${fcDeck.length} richtig (${pct}%)`;
  updateSRSBar();
}

function showCaughtUp() {
  document.getElementById('flipcard').style.display     = 'none';
  document.getElementById('fc-actions').style.display   = 'none';
  document.getElementById('fc-done-msg').style.display  = 'none';
  document.getElementById('fc-caught-up').style.display = 'block';
  updateSRSBar();
}

function restartFlash() { buildDeck(fcFilter); }

function toggleSRSMode() {
  fcSRSMode = !fcSRSMode;
  document.getElementById('srs-toggle-btn').textContent = fcSRSMode ? 'Alle üben' : 'Nur fällige';
  document.getElementById('fc-caught-up').style.display = 'none';
  buildDeck(fcFilter);
}
