/* ── VOCABULARY ── */
/* Heroicons-style SVGs (outline), topic.id → Symbol */
function topicIconSvg(topicId) {
  const inner = TOPIC_ICON_PATHS[topicId] || TOPIC_ICON_PATHS.noun;
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" class="topic-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    inner +
    '</svg>'
  );
}

const TOPIC_ICON_PATHS = {
  verb: '<path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>',
  noun: '<path d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>',
  adjective:
    '<path d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"/>',
  adverb:
    '<path d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"/>',
  preposition:
    '<path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>',
  pronoun:
    '<path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>',
  conjunction: '<path d="M12 4.5v15m7.5-7.5h-15"/>',
  quantifier:
    '<path d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/>',
  'proper noun':
    '<path d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/><path d="M6 6h.008v.008H6V6Z"/>',
};

function buildVocabTopics() {
  const grid = document.getElementById('topic-grid');
  grid.innerHTML = '';
  TOPICS.forEach(t => {
    const count = VOCAB.filter(v => v.t === t.id).length;
    const d = document.createElement('div');
    d.className = 'topic-card';
    d.innerHTML = `<div class="topic-icon">${topicIconSvg(t.id)}</div>
                   <div class="topic-name">${t.name}</div>
                   <div class="topic-count">${count} words</div>`;
    d.onclick = () => openVocabModal(t);
    grid.appendChild(d);
  });
}

function openVocabModal(topic) {
  const words = VOCAB.filter(v => v.t === topic.id);
  document.getElementById('vocab-modal-title').innerHTML =
    '<span class="vocab-modal-title-inner">' + topicIconSvg(topic.id) + '<span class="vocab-modal-title-text">' + topic.name + '</span></span>';
  document.getElementById('vocab-modal-body').innerHTML =
    words.map(w => `
      <div class="vocab-row">
        <div>
          <div class="vocab-roman">${w.r}</div>
          ${w.n ? `<div class="vocab-note">${w.n}</div>` : ''}
        </div>
        <div class="vocab-meaning">${w.m}</div>
      </div>`).join('');
  document.getElementById('vocab-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVocabModal(e) {
  if (e && e.target !== document.getElementById('vocab-modal')) return;
  document.getElementById('vocab-modal').classList.remove('open');
  document.body.style.overflow = '';
}
