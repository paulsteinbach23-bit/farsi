/* ── QUIZ (Lückentext, SRS-style) ── */

let qSentences = [];      // all phrases with gap+distractors, in fixed chronological order
let qLearned   = new Set(); // sentence indices learned this cycle
let qQueue     = [];      // sentence indices remaining (front = current live card)
let qHistory   = [];      // sentence indices in order of presentation (answered)
let qHistPos   = -1;      // -1 = live view (queue[0]); 0..N-1 = history view

/* ── Persistence ── */

function _qKey() { return 'quiz_state_' + currentLang; }

function _qSave() {
  localStorage.setItem(_qKey(), JSON.stringify({
    learned: [...qLearned],
    queue:   qQueue,
    history: qHistory,
    histPos: qHistPos,
  }));
}

function _qLoad() {
  try {
    const raw = localStorage.getItem(_qKey());
    if (!raw) return false;
    const d = JSON.parse(raw);
    const n = qSentences.length;
    if (
      !Array.isArray(d.queue) || !Array.isArray(d.history) || !Array.isArray(d.learned) ||
      d.queue.some(i => i < 0 || i >= n) ||
      d.history.some(i => i < 0 || i >= n) ||
      d.learned.some(i => i < 0 || i >= n)
    ) return false;
    qLearned = new Set(d.learned);
    qQueue   = d.queue;
    qHistory = d.history;
    qHistPos = (typeof d.histPos === 'number' && d.histPos >= -1) ? d.histPos : -1;
    return true;
  } catch (e) { return false; }
}

function _qInit() {
  qLearned = new Set();
  qQueue   = qSentences.map((_, i) => i);
  qHistory = [];
  qHistPos = -1;
}

/* ── Entry point (called on init and language switch) ── */

function buildSentences() {
  qSentences = [];
  for (const entries of Object.values(getActivePhrases())) {
    for (const p of entries) {
      if (p.gap && p.distractors) qSentences.push({ ...p, idx: qSentences.length });
    }
  }

  document.getElementById('sentence-content').innerHTML = `
    <div class="quiz-wrap">
      <div class="quiz-meta-row">
        <span id="quiz-progress-text"></span>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="quiz-prog" style="width:0%"></div></div>
      <div id="quiz-card" class="quiz-card"></div>
      <div id="quiz-done" class="done-msg" style="display:none">
        <div class="done-title">Alle gelernt! 🎉</div>
        <div class="done-sub">Du hast alle ${qSentences.length} Sätze in dieser Runde gelernt.</div>
        <button class="btn btn-primary" onclick="_qReset()">Neue Runde</button>
      </div>
      <div class="quiz-nav-row">
        <button class="quiz-nav-btn" id="quiz-prev" onclick="qPrev()">← Zurück</button>
        <button class="quiz-nav-btn" id="quiz-next" onclick="qNext()">Weiter →</button>
      </div>
    </div>
  `;

  if (!_qLoad()) _qInit();
  _qRender();
}

function _qReset() {
  _qInit();
  _qSave();
  _qRender();
}

/* ── Render ── */

function _qRender() {
  const card     = document.getElementById('quiz-card');
  const done     = document.getElementById('quiz-done');
  const progText = document.getElementById('quiz-progress-text');
  const progBar  = document.getElementById('quiz-prog');
  const prevBtn  = document.getElementById('quiz-prev');
  const nextBtn  = document.getElementById('quiz-next');

  const total   = qSentences.length;
  const learned = qLearned.size;

  progText.textContent = `${learned} / ${total} gelernt`;
  progBar.style.width  = `${total > 0 ? (learned / total) * 100 : 0}%`;

  // Prev: disabled when at live with no history, or at start of history
  prevBtn.disabled = qHistPos === -1 ? qHistory.length === 0 : qHistPos === 0;
  // Next: only active when viewing history (not at live)
  nextBtn.disabled = qHistPos === -1;

  if (qQueue.length === 0) {
    card.style.display = 'none';
    done.style.display = '';
    return;
  }

  card.style.display = '';
  done.style.display = 'none';

  if (qHistPos >= 0) {
    _qRenderHistory(card);
  } else {
    _qRenderLive(card);
  }
}

function _qRenderLive(card) {
  const idx = qQueue[0];
  const p   = qSentences[idx];

  const escaped  = p.gap.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sentence = p.r.replace(new RegExp(escaped, 'i'), '<span class="quiz-blank">___</span>');
  const choices  = [p.gap, ...p.distractors].sort(() => Math.random() - 0.5);

  card.innerHTML = `
    <div class="quiz-sentence">${sentence}</div>
    <div class="quiz-translation">${p.d}</div>
    <div class="quiz-choices">
      ${choices.map(c => `
        <button class="quiz-btn"
                data-choice="${c.replace(/"/g, '&quot;')}"
                data-correct="${p.gap.replace(/"/g, '&quot;')}"
                data-idx="${idx}"
                onclick="qPickAnswer(this)">
          ${c}
        </button>`).join('')}
    </div>
  `;
}

function _qRenderHistory(card) {
  const idx       = qHistory[qHistPos];
  const p         = qSentences[idx];
  const isLearned = qLearned.has(idx);

  const escaped  = p.gap.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sentence = p.r.replace(
    new RegExp(escaped, 'i'),
    `<span class="quiz-blank quiz-blank-revealed">${p.gap}</span>`
  );

  card.innerHTML = `
    <div class="quiz-history-badge ${isLearned ? 'quiz-badge-learned' : 'quiz-badge-open'}">
      ${isLearned ? '✅ Gelernt' : '⏳ Noch offen'}
    </div>
    <div class="quiz-sentence">${sentence}</div>
    <div class="quiz-translation">${p.d}</div>
  `;
}

/* ── Answer handler ── */

function qPickAnswer(btn) {
  const chosen  = btn.dataset.choice;
  const correct = btn.dataset.correct;
  const idx     = parseInt(btn.dataset.idx, 10);
  const btns    = btn.closest('.quiz-choices').querySelectorAll('.quiz-btn');

  btns.forEach(b => { b.disabled = true; });

  if (chosen === correct) {
    btn.classList.add('quiz-btn-correct');
    qLearned.add(idx);
    qQueue.shift();           // remove from front (learned)
    incrementPhrases();
  } else {
    btn.classList.add('quiz-btn-wrong');
    btns.forEach(b => { if (b.dataset.choice === correct) b.classList.add('quiz-btn-correct'); });
    qQueue.shift();
    qQueue.push(idx);         // move to end of queue
  }

  qHistory.push(idx);        // record in history
  // qHistPos stays -1 (live view)
  _qSave();

  setTimeout(() => _qRender(), 900);
}

/* ── Navigation ── */

function qPrev() {
  if (qHistPos === -1) {
    if (qHistory.length === 0) return;
    qHistPos = qHistory.length - 1;  // jump to last answered card
  } else if (qHistPos > 0) {
    qHistPos--;
  } else {
    return;
  }
  _qSave();
  _qRender();
}

function qNext() {
  if (qHistPos === -1) return; // at live, nothing to advance to
  if (qHistPos < qHistory.length - 1) {
    qHistPos++;
  } else {
    qHistPos = -1; // return to live
  }
  _qSave();
  _qRender();
}
