/* ── EXERCISES ── */
function buildSentences() {
  document.getElementById('sentence-content').innerHTML =
    EXERCISES.map((ex, i) => `
      <div class="ex-card">
        <div class="ex-question">
          ${ex.q.replace('___', `<input class="fill-blank" id="ex${i}" placeholder="..." onkeydown="if(event.key==='Enter')checkEx(${i})">`)}
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="checkEx(${i})" style="padding:6px 14px;font-size:13px">Check</button>
          <span class="ex-hint">Hint: ${ex.hint}</span>
        </div>
        <div id="fb${i}"></div>
      </div>`).join('');
}

/* Strip diacritics so â == a, ā == a, etc. */
function normAnswer(str) {
  return str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function checkEx(i) {
  const inp = document.getElementById('ex' + i);
  const fb  = document.getElementById('fb' + i);
  const val = normAnswer(inp.value || '');
  const ans = normAnswer(EXERCISES[i].ans);
  if (val === ans) {
    fb.innerHTML = '<div class="feedback ok">Correct! Well done.</div>';
    inp.style.borderBottomColor = 'var(--green-400)';
  } else {
    fb.innerHTML = `<div class="feedback err">Not quite. The answer is: <strong>${EXERCISES[i].ans}</strong></div>`;
    inp.style.borderBottomColor = 'var(--red-400)';
  }
}
