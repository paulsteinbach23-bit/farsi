/* ── GRAMMAR ── */
function buildGrammar() {
  document.getElementById('grammar-content').innerHTML =
    GRAMMAR.map((g, i) => `
      <div class="grammar-block">
        <div class="grammar-title">${i + 1}. ${g.title}</div>
        <div class="grammar-rule">${g.rule}</div>
        ${g.examples.map(e => `
          <div class="example-row">
            <span class="ex-roman">${e.r}</span>
            <span class="ex-meaning">&nbsp;→ ${e.m}</span>
          </div>`).join('')}
      </div>`).join('');
}
