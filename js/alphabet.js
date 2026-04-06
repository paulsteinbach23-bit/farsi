/* ── ALPHABET MODUL — Persische Schrift lernen ── */

const ABC_GOAL  = 0.80;
const ABC_TASKS = 20;

const ABC_STAGE_TITLES = [
  'Buchstabenerkennung',
  'Positionsformen',
  'Silbenbildung',
  'Romanisiert → Persisch',
  'Persisch lesen',
  'Automatisierung',
];

/* ── Wörter für Stufen 4–6 ── */
const ABC_WORDS = [
  { persian:'سلام',  roman:'salâm',   de:'Hallo' },
  { persian:'ممنون', roman:'mamnun',  de:'Danke' },
  { persian:'خانه',  roman:'khâne',   de:'Haus' },
  { persian:'آب',    roman:'âb',      de:'Wasser' },
  { persian:'نان',   roman:'nân',     de:'Brot' },
  { persian:'کتاب',  roman:'ketâb',   de:'Buch' },
  { persian:'دوست',  roman:'dust',    de:'Freund' },
  { persian:'بزرگ',  roman:'bozorg',  de:'groß' },
  { persian:'روز',   roman:'ruz',     de:'Tag' },
  { persian:'شب',    roman:'shab',    de:'Nacht' },
  { persian:'مرد',   roman:'mard',    de:'Mann' },
  { persian:'زن',    roman:'zan',     de:'Frau' },
  { persian:'بچه',   roman:'bache',   de:'Kind' },
  { persian:'مادر',  roman:'mâdar',   de:'Mutter' },
  { persian:'پدر',   roman:'pedar',   de:'Vater' },
  { persian:'نام',   roman:'nâm',     de:'Name' },
  { persian:'شهر',   roman:'shahr',   de:'Stadt' },
  { persian:'راه',   roman:'râh',     de:'Weg' },
  { persian:'دل',    roman:'del',     de:'Herz' },
  { persian:'کوچک',  roman:'kuchak',  de:'klein' },
];

/* Silben für Stufe 3 */
const ABC_SYLLABLES = [
  { persian:'با', roman:'bâ' },  { persian:'پا', roman:'pâ' },
  { persian:'تا', roman:'tâ' },  { persian:'دا', roman:'dâ' },
  { persian:'را', roman:'râ' },  { persian:'سا', roman:'sâ' },
  { persian:'کا', roman:'kâ' },  { persian:'گا', roman:'gâ' },
  { persian:'ما', roman:'mâ' },  { persian:'نا', roman:'nâ' },
  { persian:'لا', roman:'lâ' },  { persian:'فا', roman:'fâ' },
  { persian:'جا', roman:'jâ' },  { persian:'شا', roman:'shâ' },
  { persian:'خا', roman:'khâ' }, { persian:'زا', roman:'zâ' },
  { persian:'بو', roman:'bu' },  { persian:'رو', roman:'ru' },
  { persian:'شب', roman:'shab' },{ persian:'بار', roman:'bâr' },
];

/* ── localStorage ── */
function _abcGetState(n) {
  try { return JSON.parse(localStorage.getItem('farsi_alphabet_stage_' + n) || 'null'); }
  catch { return null; }
}

function _abcIsUnlocked(n) {
  if (n === 1) return true;
  const prev = _abcGetState(n - 1);
  return prev && (prev.bestScore / prev.bestTotal) >= ABC_GOAL;
}

function _abcSaveState(n, score, total) {
  const prev = _abcGetState(n);
  const prevRatio = prev ? prev.bestScore / prev.bestTotal : 0;
  if (!prev || score / total > prevRatio) {
    localStorage.setItem('farsi_alphabet_stage_' + n, JSON.stringify({ bestScore: score, bestTotal: total }));
  }
}

/* ── Stufenübersicht ── */
function buildAlphabet() {
  const el = document.getElementById('alphabet-content');
  el.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'section-title';
  header.textContent = 'Persische Schrift';
  el.appendChild(header);

  const intro = document.createElement('p');
  intro.className = 'abc-intro';
  intro.textContent = 'Lerne das persische Alphabet in 6 aufbauenden Stufen — von der Buchstabenerkennung bis zur Worterkennung.';
  el.appendChild(intro);

  for (let i = 1; i <= 6; i++) {
    const unlocked = _abcIsUnlocked(i);
    const saved    = _abcGetState(i);
    const passed   = saved && (saved.bestScore / saved.bestTotal) >= ABC_GOAL;

    const card = document.createElement('button');
    card.className = 'ex-level-card' +
      (passed ? ' ex-level-card--passed' : '') +
      (!unlocked ? ' ex-level-card--locked' : '');
    card.disabled = !unlocked;

    let badge = '';
    if (!unlocked)   badge = '<span class="ex-badge ex-badge--locked">Gesperrt</span>';
    else if (passed) badge = `<span class="ex-badge ex-badge--passed">${saved.bestScore}/${saved.bestTotal}</span>`;
    else             badge = '<span class="ex-badge ex-badge--open">Offen</span>';

    card.innerHTML = `
      <div class="ex-level-num">Stufe ${i}</div>
      <div class="ex-level-title">${ABC_STAGE_TITLES[i - 1]}</div>
      ${badge}`;

    if (unlocked) card.addEventListener('click', () => _abcStartStage(i));
    el.appendChild(card);
  }
}

/* ── Runner-State ── */
let _abcRunState = null;

/* ── Distraktoren ── */
function _abcPickDistractors(letter, key, count) {
  const result = [];
  const used   = new Set([letter[key]]);

  for (const simId of (letter.similar_to || [])) {
    const sim = ALPHABET_DATA.find(l => l.id === simId);
    if (sim && !used.has(sim[key])) { result.push(sim[key]); used.add(sim[key]); }
    if (result.length >= count) return result;
  }

  for (const l of ALPHABET_DATA) {
    if (l.id !== letter.id && l.group === letter.group && !used.has(l[key])) {
      result.push(l[key]); used.add(l[key]);
      if (result.length >= count) return result;
    }
  }

  const shuffled = [...ALPHABET_DATA].sort(() => Math.random() - 0.5);
  for (const l of shuffled) {
    if (l.id !== letter.id && !used.has(l[key])) {
      result.push(l[key]); used.add(l[key]);
      if (result.length >= count) return result;
    }
  }

  return result;
}

/* ── Task-Generatoren ── */

function _abcGenStage1Tasks() {
  const pool  = [...ALPHABET_DATA].sort(() => Math.random() - 0.5);
  const tasks = [];
  for (let i = 0; i < ABC_TASKS; i++) {
    const letter = pool[i % pool.length];
    if (i % 2 === 0) {
      // Persisch → Romanisierung
      const opts = [letter.roman, ..._abcPickDistractors(letter, 'roman', 3)].sort(() => Math.random() - 0.5);
      tasks.push({ type:'s1a', prompt:letter.persian, name:letter.name, correct:letter.roman, options:opts, note:letter.note });
    } else {
      // Romanisierung → Persisch
      const opts = [letter.persian, ..._abcPickDistractors(letter, 'persian', 3)].sort(() => Math.random() - 0.5);
      tasks.push({ type:'s1b', prompt:letter.roman, name:letter.name, correct:letter.persian, options:opts, note:letter.note });
    }
  }
  return tasks;
}

function _abcGenStage2Tasks() {
  const positions = ['isolated','initial','medial','final'];
  const posLabels = {
    isolated: 'Isoliert (alleinstehend)',
    initial:  'Initial (Wortanfang)',
    medial:   'Medial (Wortmitte)',
    final:    'Final (Wortende)',
  };
  const pool  = [...ALPHABET_DATA].sort(() => Math.random() - 0.5);
  const tasks = [];

  for (let i = 0; i < ABC_TASKS; i++) {
    const letter      = pool[i % pool.length];
    const pos         = positions[i % 4];
    const correctForm = letter.forms[pos];

    // Collect this letter's 4 forms, deduplicated
    const uniqueForms = [...new Set(positions.map(p => letter.forms[p]))];

    let options = [...uniqueForms];

    // Fill up to 4 with forms from other letters if needed
    if (options.length < 4) {
      const others = [...ALPHABET_DATA].filter(l => l.id !== letter.id).sort(() => Math.random() - 0.5);
      outer: for (const other of others) {
        for (const p of positions) {
          const f = other.forms[p];
          if (!options.includes(f)) { options.push(f); break; }
        }
        if (options.length >= 4) break outer;
      }
    }

    // Guarantee correct in set, then shuffle and cap at 4
    if (!options.includes(correctForm)) options.unshift(correctForm);
    options = options.sort(() => Math.random() - 0.5).slice(0, 4);
    if (!options.includes(correctForm)) { options[0] = correctForm; options.sort(() => Math.random() - 0.5); }

    tasks.push({
      type: 's2',
      question: `Welche Form hat „${letter.name}" (${letter.roman}) als ${posLabels[pos]}?`,
      correct: correctForm,
      options,
      note: letter.note,
    });
  }
  return tasks;
}

function _abcGenStage3Tasks() {
  const pool  = [...ABC_SYLLABLES].sort(() => Math.random() - 0.5);
  const tasks = [];
  for (let i = 0; i < ABC_TASKS; i++) {
    const syl  = pool[i % pool.length];
    const used = new Set([syl.roman]);
    const wrong = [];
    for (const s of [...ABC_SYLLABLES].sort(() => Math.random() - 0.5)) {
      if (!used.has(s.roman)) { wrong.push(s.roman); used.add(s.roman); }
      if (wrong.length >= 3) break;
    }
    const opts = [syl.roman, ...wrong].sort(() => Math.random() - 0.5);
    tasks.push({ type:'s3', prompt:syl.persian, correct:syl.roman, options:opts });
  }
  return tasks;
}

function _abcGenWordTasks(type) {
  // type 's4': roman → persian  |  's5': persian → roman
  const promptKey  = type === 's4' ? 'roman'   : 'persian';
  const correctKey = type === 's4' ? 'persian' : 'roman';

  const pool  = [...ABC_WORDS].sort(() => Math.random() - 0.5);
  const tasks = [];
  for (let i = 0; i < ABC_TASKS; i++) {
    const word  = pool[i % pool.length];
    const used  = new Set([word[correctKey]]);
    const wrong = [];
    for (const w of [...ABC_WORDS].sort(() => Math.random() - 0.5)) {
      if (!used.has(w[correctKey])) { wrong.push(w[correctKey]); used.add(w[correctKey]); }
      if (wrong.length >= 3) break;
    }
    const opts = [word[correctKey], ...wrong].sort(() => Math.random() - 0.5);
    tasks.push({ type, prompt:word[promptKey], de:word.de, correct:word[correctKey], options:opts });
  }
  return tasks;
}

function _abcGenStage4Tasks() { return _abcGenWordTasks('s4'); }
function _abcGenStage5Tasks() { return _abcGenWordTasks('s5'); }

function _abcGenStage6Tasks() {
  // Mix: 2/3 word recognition (alternating s4/s5), 1/3 letter MC (s1a)
  const wordPool   = [...ABC_WORDS].sort(() => Math.random() - 0.5);
  const letterPool = [...ALPHABET_DATA].sort(() => Math.random() - 0.5);
  const tasks      = [];

  for (let i = 0; i < ABC_TASKS; i++) {
    const mod = i % 3;
    if (mod === 0) {
      // s5: persian → roman word
      const w = wordPool[i % wordPool.length];
      const used = new Set([w.roman]);
      const wrong = [];
      for (const x of [...ABC_WORDS].sort(() => Math.random() - 0.5)) {
        if (!used.has(x.roman)) { wrong.push(x.roman); used.add(x.roman); }
        if (wrong.length >= 3) break;
      }
      tasks.push({ type:'s5', prompt:w.persian, de:w.de, correct:w.roman, options:[w.roman,...wrong].sort(() => Math.random()-0.5) });
    } else if (mod === 1) {
      // s4: roman → persian word
      const w = wordPool[(i + 5) % wordPool.length];
      const used = new Set([w.persian]);
      const wrong = [];
      for (const x of [...ABC_WORDS].sort(() => Math.random() - 0.5)) {
        if (!used.has(x.persian)) { wrong.push(x.persian); used.add(x.persian); }
        if (wrong.length >= 3) break;
      }
      tasks.push({ type:'s4', prompt:w.roman, de:w.de, correct:w.persian, options:[w.persian,...wrong].sort(() => Math.random()-0.5) });
    } else {
      // s1a: letter recognition
      const letter = letterPool[i % letterPool.length];
      const opts   = [letter.roman, ..._abcPickDistractors(letter, 'roman', 3)].sort(() => Math.random() - 0.5);
      tasks.push({ type:'s1a', prompt:letter.persian, name:letter.name, correct:letter.roman, options:opts, note:letter.note });
    }
  }
  return tasks;
}

/* ── Stage starten ── */
function _abcStartStage(n) {
  const generators = [
    null,
    _abcGenStage1Tasks,
    _abcGenStage2Tasks,
    _abcGenStage3Tasks,
    _abcGenStage4Tasks,
    _abcGenStage5Tasks,
    _abcGenStage6Tasks,
  ];
  _abcRunState = { stage:n, tasks:generators[n](), idx:0, correct:0 };
  _abcRenderRunner();
}

/* ── Exercise Runner ── */
function _abcRenderRunner() {
  const { tasks, idx } = _abcRunState;
  const total = tasks.length;
  const el    = document.getElementById('alphabet-content');

  el.innerHTML = `
    <div class="ex-runner">
      <div class="ex-runner-header">
        <button class="ex-back-btn" id="abc-back">← Übersicht</button>
        <span class="ex-runner-progress">Aufgabe ${idx + 1} von ${total}</span>
      </div>
      <div class="ex-runner-bar">
        <div class="ex-runner-fill" style="width:${Math.round(idx / total * 100)}%"></div>
      </div>
      <div id="abc-task-wrap"></div>
    </div>`;

  document.getElementById('abc-back').addEventListener('click', () => {
    if (confirm('Übung abbrechen? Dein Fortschritt in dieser Stufe geht verloren.')) buildAlphabet();
  });

  _abcRenderTask(tasks[idx], document.getElementById('abc-task-wrap'), (wasCorrect) => {
    if (wasCorrect) _abcRunState.correct++;
    _abcRunState.idx++;
    if (_abcRunState.idx < tasks.length) _abcRenderRunner();
    else                                  _abcShowResult();
  });
}

/* ── Task rendern ── */
function _abcRenderTask(task, wrap, onDone) {
  const PERSIAN_FONT = "'Scheherazade New','Noto Naskh Arabic','Traditional Arabic',serif";

  let labelHtml   = '';
  let promptHtml  = '';

  switch (task.type) {
    case 's1a':
      labelHtml  = '<div class="ex-typ-label">Was bedeutet dieser Buchstabe?</div>';
      promptHtml = `<div class="abc-persian-prompt">${task.prompt}</div>`;
      break;
    case 's1b':
      labelHtml  = '<div class="ex-typ-label">Welcher Buchstabe klingt wie …</div>';
      promptHtml = `<div class="abc-roman-prompt">${task.prompt}</div>`;
      break;
    case 's2':
      labelHtml  = '<div class="ex-typ-label">Positionsformen</div>';
      promptHtml = `<div class="abc-question-prompt">${task.question}</div>`;
      break;
    case 's3':
      labelHtml  = '<div class="ex-typ-label">Silbe lesen</div>';
      promptHtml = `<div class="abc-persian-prompt">${task.prompt}</div>`;
      break;
    case 's4':
      labelHtml  = '<div class="ex-typ-label">Romanisiert → Persisch</div>';
      promptHtml = `<div class="abc-roman-prompt">${task.prompt}</div>` +
                   (task.de ? `<div class="abc-de-hint">${task.de}</div>` : '');
      break;
    case 's5':
      labelHtml  = '<div class="ex-typ-label">Persisch lesen</div>';
      promptHtml = `<div class="abc-persian-prompt">${task.prompt}</div>` +
                   (task.de ? `<div class="abc-de-hint">${task.de}</div>` : '');
      break;
  }

  wrap.innerHTML = `
    ${labelHtml}
    ${promptHtml}
    <div class="ex-mc-options" id="abc-options"></div>
    <div class="ex-feedback" id="abc-feedback" hidden></div>
    <div class="ex-next-wrap" id="abc-next-wrap" hidden>
      <button class="btn btn-primary" id="abc-next">Weiter →</button>
    </div>`;

  // Options that are Persian script need the Arabic font
  const needPersianOpts = task.type === 's1b' || task.type === 's2' || task.type === 's4';

  const container = document.getElementById('abc-options');
  let scorable = true;
  let answered = false;

  task.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'ex-mc-btn' + (needPersianOpts ? ' abc-persian-opt' : '');
    btn.textContent = opt;

    btn.addEventListener('click', () => {
      if (answered) return;
      const isRight = opt === task.correct;

      if (isRight) {
        answered = true;
        container.querySelectorAll('.ex-mc-btn').forEach(b => {
          b.disabled = true;
          if (b.textContent === task.correct) b.classList.add('ex-mc--correct');
        });
        const fb = document.getElementById('abc-feedback');
        fb.hidden    = false;
        fb.className = 'ex-feedback ex-feedback--correct';
        fb.innerHTML = '<strong>Richtig!</strong>';
        if (task.note) fb.innerHTML += `<div class="ex-explanation">${task.note}</div>`;
        document.getElementById('abc-next-wrap').hidden = false;
        document.getElementById('abc-next').addEventListener('click', () => onDone(scorable));
      } else {
        scorable = false;
        btn.classList.add('wrong-flash');
        setTimeout(() => btn.classList.remove('wrong-flash'), 600);
      }
    });
    container.appendChild(btn);
  });
}

/* ── Ergebnis ── */
function _abcShowResult() {
  const { stage, correct, tasks } = _abcRunState;
  const total  = tasks.length;
  const pct    = Math.round(correct / total * 100);
  const passed = pct >= 80;

  _abcSaveState(stage, correct, total);

  const el = document.getElementById('alphabet-content');
  el.innerHTML = `
    <div class="ex-result">
      <div class="ex-result-emoji">${pct >= 90 ? '🎉' : pct >= 80 ? '✅' : '💪'}</div>
      <div class="ex-result-score">${correct} / ${total} richtig</div>
      <div class="ex-result-pct">${pct}%</div>
      <div class="ex-result-level">Stufe ${stage} — ${ABC_STAGE_TITLES[stage - 1]}</div>
      <div class="ex-result-msg">${passed ? 'Bestanden! Nächste Stufe freigeschaltet.' : 'Noch nicht bestanden — 80% nötig.'}</div>
      <div class="ex-result-btns" id="abc-result-btns"></div>
    </div>`;

  const btns = document.getElementById('abc-result-btns');

  if (passed && stage < 6) {
    const nextBtn = document.createElement('button');
    nextBtn.className   = 'btn btn-primary';
    nextBtn.textContent = 'Weiter → Stufe ' + (stage + 1);
    nextBtn.addEventListener('click', () => _abcStartStage(stage + 1));
    btns.appendChild(nextBtn);
  }

  const overviewBtn = document.createElement('button');
  overviewBtn.className   = 'btn';
  overviewBtn.textContent = 'Zur Übersicht';
  overviewBtn.addEventListener('click', buildAlphabet);
  btns.appendChild(overviewBtn);

  const retryBtn = document.createElement('button');
  retryBtn.className   = 'btn';
  retryBtn.textContent = 'Wiederholen';
  retryBtn.addEventListener('click', () => _abcStartStage(stage));
  btns.appendChild(retryBtn);
}
