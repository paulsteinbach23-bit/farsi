/* ── NAVIGATION ── */
function show(id, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ── INIT ── */
initStreak();
buildDeck('all');
buildVocabTopics();
buildGrammar();
buildSentences();
buildPhrases();
buildAlphabet();
