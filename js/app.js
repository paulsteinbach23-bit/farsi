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

/* ── LANGUAGE PICKER ── */
function toggleLangMenu() {
  const menu    = document.getElementById('lang-picker-menu');
  const chevron = document.getElementById('lang-picker-chevron');
  const isOpen  = menu.classList.toggle('open');
  chevron.classList.toggle('open', isOpen);
}

function selectLang(lang) {
  const menu    = document.getElementById('lang-picker-menu');
  const chevron = document.getElementById('lang-picker-chevron');
  menu.classList.remove('open');
  chevron.classList.remove('open');
  switchLanguage(lang);
}

/* Close dropdown when clicking outside */
document.addEventListener('click', function(e) {
  const picker = document.getElementById('lang-picker');
  if (picker && !picker.contains(e.target)) {
    document.getElementById('lang-picker-menu')?.classList.remove('open');
    document.getElementById('lang-picker-chevron')?.classList.remove('open');
  }
});

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
  const css = (id, val) => { const e = document.getElementById(id); if (e) e.style.display = val; };
  const txt = (id, val) => { const e = document.getElementById(id); if (e) e.textContent   = val; };
  const flags = { farsi: '🇮🇷', french: '🇫🇷', spanish: '🇪🇸' };
  const names = { farsi: 'Farsi', french: 'Français', spanish: 'Español' };

  txt('lang-flag', flags[currentLang] || '🌐');
  txt('lang-name', names[currentLang] || currentLang);
  css('farsi101-wrap', isFarsi ? '' : 'none');
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
