/* ── IRAN TAB ── */
let _iranData = null;
let _iranQuizState = null;

const _IRAN_ICONS = {
  geography:        '🗺️',
  language_culture: '🗣️',
  history:          '📜',
  culture:          '⭐',
  economy:          '📊',
};

async function buildIran() {
  if (_iranData) { _renderIranCategories(); return; }
  const el = document.getElementById('iran-content');
  el.innerHTML = '<div class="iran-loading">Wird geladen…</div>';
  try {
    const resp = await fetch('./iran-facts.json');
    _iranData = await resp.json();
    _renderIranCategories();
  } catch (e) {
    el.innerHTML = '<div class="iran-loading">Fehler beim Laden. Bitte Seite neu laden.</div>';
  }
}

function _iranGetProgress(catId) {
  try {
    return JSON.parse(localStorage.getItem('farsi_iran_' + catId) || 'null') || { correct: 0, total: 0, answered: [] };
  } catch { return { correct: 0, total: 0, answered: [] }; }
}

function _renderIranCategories() {
  const el = document.getElementById('iran-content');
  el.innerHTML = `
    <div class="section-title">Iran — Allgemeinwissen</div>
    <div class="iran-cat-grid" id="iran-cat-grid"></div>`;

  const grid = document.getElementById('iran-cat-grid');
  _iranData.categories.forEach(cat => {
    const total = cat.facts.length;
    const prog  = _iranGetProgress(cat.id);
    const done  = prog.answered.length;
    const pct   = total ? Math.round(done / total * 100) : 0;
    const icon  = _IRAN_ICONS[cat.id] || '📌';

    const card = document.createElement('button');
    card.className = 'iran-cat-card';
    card.innerHTML = `
      <div class="iran-cat-icon">${icon}</div>
      <div class="iran-cat-title">${cat.title}</div>
      <div class="iran-cat-meta">${done}/${total} Fragen</div>
      <div class="iran-cat-bar"><div class="iran-cat-fill" style="width:${pct}%"></div></div>`;
    card.addEventListener('click', () => _startIranQuiz(cat.id));
    grid.appendChild(card);
  });
}

function _startIranQuiz(catId) {
  const cat = _iranData.categories.find(c => c.id === catId);
  if (!cat) return;
  _iranQuizState = { catId, idx: 0, correct: 0, answered: [] };
  _showIranQuestion(cat, 0);
}

function _showIranQuestion(cat, idx) {
  const el    = document.getElementById('iran-content');
  const fact  = cat.facts[idx];
  const total = cat.facts.length;
  const shuffled = [...fact.options].sort(() => Math.random() - 0.5);

  el.innerHTML = `
    <div class="iran-quiz-header">
      <button class="iran-back-btn" id="iran-back">← Kategorien</button>
      <span class="iran-quiz-progress">${idx + 1} / ${total}</span>
    </div>
    <div class="iran-progress-bar">
      <div class="iran-progress-fill" style="width:${Math.round(idx / total * 100)}%"></div>
    </div>
    <div class="iran-question">${fact.question}</div>
    <div class="iran-options" id="iran-options"></div>
    <div class="iran-explanation" id="iran-expl" hidden></div>
    <div class="iran-next-wrap" id="iran-next-wrap" hidden>
      <button class="btn btn-primary" id="iran-next">Weiter →</button>
    </div>`;

  document.getElementById('iran-back').addEventListener('click', _renderIranCategories);

  const optContainer = document.getElementById('iran-options');
  shuffled.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'iran-opt-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => _answerIran(btn, cat, idx, opt, fact));
    optContainer.appendChild(btn);
  });

  document.getElementById('iran-next').addEventListener('click', () => {
    if (idx + 1 < cat.facts.length) {
      _showIranQuestion(cat, idx + 1);
    } else {
      _showIranResult(cat.id);
    }
  });
}

function _answerIran(chosenBtn, cat, idx, chosen, fact) {
  document.querySelectorAll('.iran-opt-btn').forEach(b => { b.disabled = true; });

  const isCorrect = chosen === fact.correct;
  chosenBtn.classList.add(isCorrect ? 'iran-opt--correct' : 'iran-opt--wrong');
  if (!isCorrect) {
    document.querySelectorAll('.iran-opt-btn').forEach(b => {
      if (b.textContent === fact.correct) b.classList.add('iran-opt--correct');
    });
  }

  if (_iranQuizState) {
    if (isCorrect) _iranQuizState.correct++;
    if (!_iranQuizState.answered.includes(fact.id)) _iranQuizState.answered.push(fact.id);
  }

  const expl = document.getElementById('iran-expl');
  expl.textContent = fact.explanation;
  expl.hidden = false;
  document.getElementById('iran-next-wrap').hidden = false;
}

function _showIranResult(catId) {
  const cat   = _iranData.categories.find(c => c.id === catId);
  const state = _iranQuizState;
  const pct   = Math.round(state.correct / cat.facts.length * 100);

  try {
    const prev   = _iranGetProgress(catId);
    const merged = [...new Set([...prev.answered, ...state.answered])];
    localStorage.setItem('farsi_iran_' + catId, JSON.stringify({
      correct:  state.correct,
      total:    cat.facts.length,
      answered: merged,
    }));
  } catch (e) {}

  const el = document.getElementById('iran-content');
  el.innerHTML = `
    <div class="iran-result">
      <div class="iran-result-emoji">${pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
      <div class="iran-result-score">${state.correct} / ${cat.facts.length} richtig</div>
      <div class="iran-result-pct">${pct}%</div>
      <div class="iran-result-title">${cat.title}</div>
      <div class="iran-result-btns" id="iran-result-btns"></div>
    </div>`;

  const btns = document.getElementById('iran-result-btns');

  const backBtn = document.createElement('button');
  backBtn.className = 'btn btn-primary';
  backBtn.textContent = 'Zurück zur Übersicht';
  backBtn.addEventListener('click', _renderIranCategories);
  btns.appendChild(backBtn);

  const againBtn = document.createElement('button');
  againBtn.className = 'btn';
  againBtn.textContent = 'Nochmal';
  againBtn.addEventListener('click', () => _startIranQuiz(catId));
  btns.appendChild(againBtn);
}
