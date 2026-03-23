/* ── PHRASEBOOK ── */
function buildPhrases() {
  document.getElementById('phrase-content').innerHTML =
    Object.entries(PHRASES).map(([sec, rows]) => `
      <div class="phrase-section">
        <div class="phrase-section-title">${sec}</div>
        <div class="card">
          ${rows.map(p => `
            <div class="phrase-row">
              <div class="phrase-roman">${p.r}</div>
              <div class="phrase-de">${p.d}</div>
            </div>`).join('')}
        </div>
      </div>`).join('');
}
