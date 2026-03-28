/* ── QUIZ (Duolingo-style) ── */
let quizDeck  = [];
let quizIdx   = 0;
let quizRight = 0;

function buildSentences() {
  /* Collect all phrase entries that have gap + distractors */
  quizDeck = [];
  for (const entries of Object.values(getActivePhrases())) {
    for (const p of entries) {
      if (p.gap && p.distractors) quizDeck.push(p);
    }
  }
  /* Fisher-Yates shuffle */
  for (let i = quizDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizDeck[i], quizDeck[j]] = [quizDeck[j], quizDeck[i]];
  }
  quizIdx   = 0;
  quizRight = 0;

  document.getElementById('sentence-content').innerHTML = `
    <div class="quiz-wrap">
      <div class="quiz-meta-row">
        <span id="quiz-counter"></span>
        <span id="quiz-score-live" class="quiz-score-live"></span>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="quiz-prog" style="width:0%"></div></div>
      <div id="quiz-card" class="quiz-card"></div>
      <div id="quiz-done" class="done-msg" style="display:none">
        <div class="done-title">Fertig!</div>
        <div class="done-sub" id="quiz-final-score"></div>
        <button class="btn btn-primary" onclick="buildSentences()">Nochmal</button>
      </div>
    </div>
  `;
  showQuizQ();
}

function showQuizQ() {
  const card = document.getElementById('quiz-card');

  if (quizIdx >= quizDeck.length) {
    card.style.display = 'none';
    const done = document.getElementById('quiz-done');
    done.style.display = '';
    document.getElementById('quiz-final-score').textContent =
      `${quizRight} von ${quizDeck.length} richtig`;
    return;
  }

  const p = quizDeck[quizIdx];

  /* Replace the gap word in the sentence with ___ */
  const escaped = p.gap.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sentence = p.r.replace(
    new RegExp(escaped, 'i'),
    '<span class="quiz-blank">___</span>'
  );

  /* Shuffle choices */
  const choices = [p.gap, ...p.distractors].sort(() => Math.random() - 0.5);

  document.getElementById('quiz-counter').textContent =
    `Frage ${quizIdx + 1} / ${quizDeck.length}`;
  document.getElementById('quiz-score-live').textContent = `✓ ${quizRight}`;
  document.getElementById('quiz-prog').style.width =
    `${(quizIdx / quizDeck.length) * 100}%`;

  card.style.display = '';
  card.innerHTML = `
    <div class="quiz-sentence">${sentence}</div>
    <div class="quiz-translation">${p.d}</div>
    <div class="quiz-choices">
      ${choices.map(c => `
        <button class="quiz-btn"
                data-choice="${c.replace(/"/g, '&quot;')}"
                data-correct="${p.gap.replace(/"/g, '&quot;')}"
                onclick="pickAnswer(this)">
          ${c}
        </button>`).join('')}
    </div>
  `;
}

function pickAnswer(btn) {
  const chosen  = btn.dataset.choice;
  const correct = btn.dataset.correct;
  const btns    = btn.closest('.quiz-choices').querySelectorAll('.quiz-btn');

  btns.forEach(b => { b.disabled = true; });

  if (chosen === correct) {
    btn.classList.add('quiz-btn-correct');
    quizRight++;
    incrementPhrases();
  } else {
    btn.classList.add('quiz-btn-wrong');
    btns.forEach(b => {
      if (b.dataset.choice === correct) b.classList.add('quiz-btn-correct');
    });
  }

  document.getElementById('quiz-score-live').textContent = `✓ ${quizRight}`;
  quizIdx++;
  setTimeout(showQuizQ, 900);
}
