/* ── VOCABULARY ── */
function buildVocabTopics() {
  const grid = document.getElementById('topic-grid');
  grid.innerHTML = '';
  TOPICS.forEach(t => {
    const count = VOCAB.filter(v => v.t === t.id).length;
    const d = document.createElement('div');
    d.className = 'topic-card';
    d.innerHTML = `<div class="topic-icon">${t.icon}</div>
                   <div class="topic-name">${t.name}</div>
                   <div class="topic-count">${count} words</div>`;
    d.onclick = () => openVocabModal(t);
    grid.appendChild(d);
  });
}

function openVocabModal(topic) {
  const words = VOCAB.filter(v => v.t === topic.id);
  document.getElementById('vocab-modal-title').textContent = `${topic.icon}  ${topic.name}`;
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
