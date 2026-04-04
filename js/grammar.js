/* ── GRAMMAR ── */
function _renderGrammarTable(table) {
  const caption = table.caption
    ? `<caption class="grammar-table-caption">${table.caption}</caption>`
    : '';
  const thead = `<thead><tr>${table.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${table.rows.map(row =>
    `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
  ).join('')}</tbody>`;
  return `<div class="grammar-table-wrap"><table class="grammar-table">${caption}${thead}${tbody}</table></div>`;
}

function _renderGrammarSubsection(sub) {
  const tables   = (sub.tables   || []).map(_renderGrammarTable).join('');
  const examples = (sub.examples || []).map(e => `
    <div class="example-row">
      <span class="ex-roman">${e.romanized}</span>
      <span class="ex-meaning">&nbsp;→ ${e.german}</span>
    </div>`).join('');
  const note = sub.note ? `<div class="grammar-note">${sub.note}</div>` : '';
  return `
    <div class="grammar-subsection">
      <div class="grammar-subtitle">${sub.title}</div>
      <div class="grammar-rule">${sub.rule}</div>
      ${tables}${examples}${note}
    </div>`;
}

function buildGrammar() {
  document.getElementById('grammar-content').innerHTML =
    GRAMMAR_DATA.sections.map(section => `
      <div class="grammar-block">
        <div class="grammar-title">${section.title}</div>
        ${section.intro ? `<div class="grammar-intro">${section.intro}</div>` : ''}
        ${section.subsections.map(_renderGrammarSubsection).join('')}
      </div>`).join('');
}
