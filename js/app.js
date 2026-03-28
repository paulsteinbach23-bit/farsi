/* ── THEME ── */
function toggleTheme() {
  const html   = document.documentElement;
  const isDark = html.classList.contains('theme-dark') ||
    (!html.classList.contains('theme-light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  html.classList.remove('theme-dark', 'theme-light');
  if (isDark) {
    html.classList.add('theme-light');
    localStorage.setItem('farsi_theme', 'light');
  } else {
    html.classList.add('theme-dark');
    localStorage.setItem('farsi_theme', 'dark');
  }
  _updateThemeBtn();
}

function _updateThemeBtn() {
  const btn    = document.getElementById('theme-toggle');
  if (!btn) return;
  const html   = document.documentElement;
  const isDark = html.classList.contains('theme-dark') ||
    (!html.classList.contains('theme-light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  btn.textContent = isDark ? '☀️' : '🌙';
}

/* ── NAVIGATION ── */
function show(id, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
}

function showSub(id, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
}

function toggleFarsi101() {
  const sub   = document.getElementById('farsi101-sub');
  const arrow = document.getElementById('farsi101-arrow');
  const open  = sub.classList.toggle('open');
  arrow.classList.toggle('open', open);
}

/* ── LANGUAGE SWITCH ── */
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('app_lang', lang);
  _applyLangUI();
  fcFilter = 'all';
  buildDeck('all');
  buildSentences();
  buildPhrases();
  show('flash', document.querySelector('.nav-btn'));
}

function _applyLangUI() {
  const isFr = currentLang === 'french';
  document.getElementById('nav-alphabet').style.display   = isFr ? 'none' : '';
  document.getElementById('nav-phrases-fr').style.display = isFr ? '' : 'none';
  document.getElementById('farsi101-wrap').style.display  = isFr ? 'none' : '';
  document.getElementById('lang-farsi').classList.toggle('active', !isFr);
  document.getElementById('lang-french').classList.toggle('active', isFr);
}

/* ── INIT ── */
_updateThemeBtn();
initStreak();
buildDeck('all');
buildVocabTopics();
buildGrammar();
buildSentences();
buildPhrases();
buildAlphabet();
_applyLangUI();
