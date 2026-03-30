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
function _setGlobe(visible) {
  const btn = document.getElementById('globe-btn');
  if (btn) btn.style.display = visible ? 'flex' : 'none';
}

function show(id, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  _setGlobe(id === 'flash');
}

function showSub(id, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  _setGlobe(false);
}

function toggleFarsi101() {
  const sub   = document.getElementById('farsi101-sub');
  const arrow = document.getElementById('farsi101-arrow');
  const open  = sub.classList.toggle('open');
  arrow.classList.toggle('open', open);
}

/* ── LANGUAGE SCREEN ── */
function openLangScreen() {
  ['farsi', 'french', 'spanish'].forEach(lang => {
    const card = document.getElementById('lang-card-' + lang);
    if (card) card.classList.toggle('active', lang === currentLang);
  });
  document.getElementById('lang-screen').classList.add('open');
}

function closeLangScreen() {
  document.getElementById('lang-screen').classList.remove('open');
}

function selectLang(lang) {
  closeLangScreen();
  switchLanguage(lang);
}

/* ── LANGUAGE SWITCH ── */
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('app_lang', lang);
  initLessons();
  _applyLangUI();
  buildSentences();
  buildPhrases();
  buildLessonsScreen();
  startLessonSession(getActiveLessonIdx());
  show('flash', document.getElementById('nav-flash'));
}

function _applyLangUI() {
  const isFarsi = currentLang === 'farsi';
  const e = document.getElementById('farsi101-wrap');
  if (e) e.style.display = isFarsi ? '' : 'none';
}

/* ── INIT ── */
_updateThemeBtn();
initStreak();
initLessons();
buildLessonsScreen();
buildVocabTopics();
buildGrammar();
buildSentences();
buildPhrases();
buildAlphabet();
_applyLangUI();
startLessonSession(getActiveLessonIdx());
