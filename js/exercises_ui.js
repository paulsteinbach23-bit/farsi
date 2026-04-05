/* ── ÜBUNGEN TAB ── */

/* ── State ── */
let _exState = null;  // { levelId, tasks, idx, correct }

/* ── Helpers ── */
function _exGetLevelState(n) {
  try {
    return JSON.parse(localStorage.getItem('farsi_exercise_level_' + n) || 'null');
  } catch { return null; }
}

function _exIsUnlocked(n) {
  if (n === 1) return true;
  const prev = _exGetLevelState(n - 1);
  return prev && prev.bestTotal > 0 && (prev.bestScore / prev.bestTotal) >= 0.75;
}

function _exLevelStatus(n) {
  if (!_exIsUnlocked(n)) return 'locked';
  const s = _exGetLevelState(n);
  return s ? 'passed' : 'open';
}

const _PHASE_LABELS = { 1: 'Phase 1 — Fundament', 2: 'Phase 2 — Aufbau', 3: 'Phase 3 — Konsolidierung', 4: 'Phase 4 — Fortgeschritten' };

/* ── Level Grid ── */
function buildUebungen() {
  const el = document.getElementById('uebungen-content');
  el.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'section-title';
  header.textContent = 'Übungen';
  el.appendChild(header);

  let currentPhase = 0;
  EXERCISE_LEVELS.forEach(level => {
    if (level.phase !== currentPhase) {
      currentPhase = level.phase;
      const ph = document.createElement('div');
      ph.className = 'ex-phase-label';
      ph.textContent = _PHASE_LABELS[level.phase] || ('Phase ' + level.phase);
      el.appendChild(ph);
    }

    const status = _exLevelStatus(level.id);
    const saved  = _exGetLevelState(level.id);
    const card   = document.createElement('button');
    card.className = 'ex-level-card ex-level-card--' + status;
    card.disabled  = status === 'locked';

    let badgeHtml = '';
    if (status === 'locked')      badgeHtml = '<span class="ex-badge ex-badge--locked">Gesperrt</span>';
    else if (status === 'passed') badgeHtml = `<span class="ex-badge ex-badge--passed">${saved.bestScore}/${saved.bestTotal}</span>`;
    else                          badgeHtml = '<span class="ex-badge ex-badge--open">Offen</span>';

    card.innerHTML = `
      <div class="ex-level-num">Level ${level.id}</div>
      <div class="ex-level-title">${level.title}</div>
      ${badgeHtml}`;

    if (status !== 'locked') {
      card.addEventListener('click', () => _startLevel(level.id));
    }
    el.appendChild(card);
  });
}

/* ── Exercise Runner ── */
function _startLevel(levelId) {
  const level = EXERCISE_LEVELS.find(l => l.id === levelId);
  if (!level) return;
  if (!level.tasks || level.tasks.length === 0) {
    _showNoTasks(levelId, level.title);
    return;
  }
  _exState = { levelId, tasks: [...level.tasks], idx: 0, correct: 0 };
  _renderExRunner();
}

function _showNoTasks(levelId, title) {
  const el = document.getElementById('uebungen-content');
  el.innerHTML = `
    <div class="ex-runner">
      <div class="ex-runner-header">
        <button class="ex-back-btn" id="ex-back">← Übersicht</button>
        <span></span>
      </div>
      <div class="ex-empty">
        <div style="font-size:2rem">🚧</div>
        <div>Level ${levelId}: ${title}</div>
        <div style="color:var(--text-secondary);font-size:13px;margin-top:4px">Aufgaben werden bald hinzugefügt.</div>
      </div>
    </div>`;
  document.getElementById('ex-back').addEventListener('click', buildUebungen);
}

function _renderExRunner() {
  const { tasks, idx } = _exState;
  const total = tasks.length;
  const task  = tasks[idx];
  const el    = document.getElementById('uebungen-content');

  el.innerHTML = `
    <div class="ex-runner">
      <div class="ex-runner-header">
        <button class="ex-back-btn" id="ex-back">← Übersicht</button>
        <span class="ex-runner-progress">Aufgabe ${idx + 1} von ${total}</span>
      </div>
      <div class="ex-runner-bar">
        <div class="ex-runner-fill" style="width:${Math.round(idx / total * 100)}%"></div>
      </div>
      <div class="ex-task-wrap" id="ex-task-wrap"></div>
    </div>`;

  document.getElementById('ex-back').addEventListener('click', () => {
    if (confirm('Übung abbrechen? Dein Fortschritt in diesem Level geht verloren.')) buildUebungen();
  });

  const wrap = document.getElementById('ex-task-wrap');
  const onDone = (wasCorrect) => {
    if (wasCorrect) _exState.correct++;
    _exState.idx++;
    if (_exState.idx < _exState.tasks.length) {
      _renderExRunner();
    } else {
      _showLevelResult();
    }
  };

  if      (task.type === 1) _renderTyp1(task, wrap, onDone);
  else if (task.type === 2) _renderTyp2(task, wrap, onDone);
  else if (task.type === 5) _renderTyp5(task, wrap, onDone);
  else if (task.type === 6) _renderTyp6(task, wrap, onDone);
  else if (task.type === 7) _renderTyp7(task, wrap, onDone);
  else { onDone(false); }
}

function _showLevelResult() {
  const { levelId, correct, tasks } = _exState;
  const total  = tasks.length;
  const pct    = Math.round(correct / total * 100);
  const passed = pct >= 75;
  const level  = EXERCISE_LEVELS.find(l => l.id === levelId);

  if (passed) {
    const prev = _exGetLevelState(levelId);
    const prevBest = prev ? prev.bestScore / prev.bestTotal : 0;
    if (!prev || correct / total > prevBest) {
      localStorage.setItem('farsi_exercise_level_' + levelId, JSON.stringify({
        bestScore: correct,
        bestTotal: total,
      }));
    }
    if (!prev) incrementExercises();  // count first pass of each level toward streak
  }

  const el = document.getElementById('uebungen-content');
  el.innerHTML = `
    <div class="ex-result">
      <div class="ex-result-emoji">${pct >= 90 ? '🎉' : pct >= 75 ? '✅' : '💪'}</div>
      <div class="ex-result-score">${correct} / ${total} richtig</div>
      <div class="ex-result-pct">${pct}%</div>
      <div class="ex-result-level">Level ${levelId} — ${level ? level.title : ''}</div>
      <div class="ex-result-msg">${passed ? 'Bestanden! Nächstes Level freigeschaltet.' : 'Noch nicht bestanden. 75% nötig.'}</div>
      <div class="ex-result-btns" id="ex-result-btns"></div>
    </div>`;

  const btns = document.getElementById('ex-result-btns');

  if (passed && levelId < EXERCISE_LEVELS.length) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = 'Weiter → Level ' + (levelId + 1);
    nextBtn.addEventListener('click', () => _startLevel(levelId + 1));
    btns.appendChild(nextBtn);
  }

  const overviewBtn = document.createElement('button');
  overviewBtn.className = 'btn';
  overviewBtn.textContent = 'Zur Übersicht';
  overviewBtn.addEventListener('click', buildUebungen);
  btns.appendChild(overviewBtn);

  const retryBtn = document.createElement('button');
  retryBtn.className = 'btn';
  retryBtn.textContent = 'Wiederholen';
  retryBtn.addEventListener('click', () => _startLevel(levelId));
  btns.appendChild(retryBtn);
}

/* ──────────────────────────────────────────
   TYP 1 — Satz zusammenbauen (Word Order)
────────────────────────────────────────── */
function _renderTyp1(task, wrap, onDone) {
  const shuffled = [...task.tiles].sort(() => Math.random() - 0.5);
  let answer = [];

  wrap.innerHTML = `
    <div class="ex-typ-label">Satz zusammenbauen</div>
    <div class="ex-typ1-de">${task.de}</div>
    <div class="tile-answer" id="tile-answer"></div>
    <div class="tile-pool"   id="tile-pool"></div>
    <button class="btn btn-primary ex-check-btn" id="ex-check" disabled>Prüfen</button>
    <div class="ex-feedback" id="ex-feedback" hidden></div>
    <div class="ex-next-wrap" id="ex-next-wrap" hidden>
      <button class="btn btn-primary" id="ex-next">Weiter →</button>
    </div>`;

  const answerEl = document.getElementById('tile-answer');
  const poolEl   = document.getElementById('tile-pool');
  const checkBtn = document.getElementById('ex-check');
  let answered = false;

  function renderTiles() {
    poolEl.innerHTML   = '';
    answerEl.innerHTML = '';

    shuffled.forEach((tile, i) => {
      if (!answer.includes(i)) {
        const btn = document.createElement('button');
        btn.className = 'tile tile--pool';
        btn.textContent = tile;
        btn.addEventListener('click', () => {
          if (answered) return;
          answer.push(i);
          checkBtn.disabled = answer.length !== task.solution.length;
          renderTiles();
        });
        poolEl.appendChild(btn);
      }
    });

    answer.forEach((tileIdx, pos) => {
      const btn = document.createElement('button');
      btn.className = 'tile tile--answer';
      btn.textContent = shuffled[tileIdx];
      btn.addEventListener('click', () => {
        if (answered) return;
        answer.splice(pos, 1);
        checkBtn.disabled = true;
        renderTiles();
      });
      answerEl.appendChild(btn);
    });
  }

  renderTiles();

  checkBtn.addEventListener('click', () => {
    answered = true;
    checkBtn.disabled = true;
    const given   = answer.map(i => shuffled[i]).join(' ').toLowerCase();
    const correct = task.solution.join(' ').toLowerCase();
    const isRight = given === correct;

    const fb = document.getElementById('ex-feedback');
    fb.hidden = false;
    fb.className = 'ex-feedback ' + (isRight ? 'ex-feedback--correct' : 'ex-feedback--wrong');
    fb.innerHTML = isRight
      ? `<strong>Richtig!</strong>`
      : `<strong>Falsch.</strong> Korrekt: <span class="ex-correct-sentence">${task.solution.join(' ')}</span>`;
    if (task.explanation) fb.innerHTML += `<div class="ex-explanation">${task.explanation}</div>`;

    document.getElementById('ex-next-wrap').hidden = false;
    document.getElementById('ex-next').addEventListener('click', () => onDone(isRight));

    // highlight answer tiles
    document.querySelectorAll('.tile--answer').forEach((btn, i) => {
      const given = shuffled[answer[i]];
      const exp   = task.solution[i];
      btn.classList.add(given && given.toLowerCase() === exp.toLowerCase() ? 'tile--ok' : 'tile--err');
    });
  });
}

/* ──────────────────────────────────────────
   TYP 2 — Lückentext mit Formauswahl
────────────────────────────────────────── */
function _renderTyp2(task, wrap, onDone) {
  const highlighted = task.sentence.replace('___', '<span class="ex-gap">___</span>');

  wrap.innerHTML = `
    <div class="ex-typ-label">Lücke ausfüllen</div>
    <div class="ex-typ2-sentence">${highlighted}</div>
    ${task.de ? `<div class="ex-typ2-de">${task.de}</div>` : ''}
    <div class="ex-mc-options" id="ex-options"></div>
    <div class="ex-feedback" id="ex-feedback" hidden></div>
    <div class="ex-next-wrap" id="ex-next-wrap" hidden>
      <button class="btn btn-primary" id="ex-next">Weiter →</button>
    </div>`;

  _buildMcOptions(task, onDone);
}

/* ──────────────────────────────────────────
   TYP 5 — Übersetzung Farsi→Deutsch
────────────────────────────────────────── */
function _renderTyp5(task, wrap, onDone) {
  wrap.innerHTML = `
    <div class="ex-typ-label">Was bedeutet das?</div>
    <div class="ex-typ5-farsi">${task.farsi}</div>
    <div class="ex-mc-options" id="ex-options"></div>
    <div class="ex-feedback" id="ex-feedback" hidden></div>
    <div class="ex-next-wrap" id="ex-next-wrap" hidden>
      <button class="btn btn-primary" id="ex-next">Weiter →</button>
    </div>`;

  _buildMcOptions(task, onDone);
}

/* ──────────────────────────────────────────
   TYP 6 — Fehler finden
────────────────────────────────────────── */
function _renderTyp6(task, wrap, onDone) {
  wrap.innerHTML = `
    <div class="ex-typ-label">Welcher Satz ist korrekt?</div>
    <div class="ex-typ6-prompt">${task.prompt}</div>
    <div class="ex-mc-options" id="ex-options"></div>
    <div class="ex-feedback" id="ex-feedback" hidden></div>
    <div class="ex-next-wrap" id="ex-next-wrap" hidden>
      <button class="btn btn-primary" id="ex-next">Weiter →</button>
    </div>`;

  _buildMcOptions(task, onDone);
}

/* ──────────────────────────────────────────
   TYP 7 — Iran-Allgemeinwissen
────────────────────────────────────────── */
function _renderTyp7(task, wrap, onDone) {
  wrap.innerHTML = `
    <div class="ex-typ-label">Iran — Allgemeinwissen</div>
    <div class="ex-typ7-prompt">${task.prompt}</div>
    <div class="ex-mc-options" id="ex-options"></div>
    <div class="ex-feedback" id="ex-feedback" hidden></div>
    <div class="ex-next-wrap" id="ex-next-wrap" hidden>
      <button class="btn btn-primary" id="ex-next">Weiter →</button>
    </div>`;

  _buildMcOptions(task, onDone);
}

/* ── Shared MC option builder (Typ 2, 5, 6, 7) ── */
function _buildMcOptions(task, onDone) {
  const container = document.getElementById('ex-options');
  const shuffled  = [...task.options].sort(() => Math.random() - 0.5);
  let   answered  = false;

  shuffled.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'ex-mc-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      const isRight = opt === task.correct;
      container.querySelectorAll('.ex-mc-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === task.correct) b.classList.add('ex-mc--correct');
      });
      if (!isRight) btn.classList.add('ex-mc--wrong');

      const fb = document.getElementById('ex-feedback');
      fb.hidden    = false;
      fb.className = 'ex-feedback ' + (isRight ? 'ex-feedback--correct' : 'ex-feedback--wrong');
      fb.innerHTML = isRight ? '<strong>Richtig!</strong>' : '<strong>Falsch.</strong>';
      if (task.explanation) fb.innerHTML += `<div class="ex-explanation">${task.explanation}</div>`;

      document.getElementById('ex-next-wrap').hidden = false;
      document.getElementById('ex-next').addEventListener('click', () => onDone(isRight));
    });
    container.appendChild(btn);
  });
}
