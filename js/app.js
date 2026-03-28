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
  _applyLangUI();
  buildSentences();
  buildPhrases();
  if (lang === 'farsi') {
    startLessonSession(getActiveLessonIdx());
  } else {
    // French: simple full-deck mode (no lesson system)
    fcDeck = shuffle(getActiveVocab().map(card => ({ card, direction: 'recognition', isLesson: true })));
    fcIdx = 0; fcFlipped = false; fcCorrect = 0; fcDone = 0;
    document.getElementById('fc-done-msg').style.display = 'none';
    document.getElementById('flipcard').style.display    = 'block';
    document.getElementById('fc-actions').style.display  = 'none';
    const label = document.getElementById('fc-lesson-label');
    if (label) label.textContent = 'Français';
    updateFlashStats();
    showCurrentCard();
  }
  show('flash', document.getElementById('nav-flash'));
}

function _applyLangUI() {
  const isFr = currentLang === 'french';
  const css = (id, val) => { const e = document.getElementById(id); if (e) e.style.display = val; };
  const txt = (id, val) => { const e = document.getElementById(id); if (e) e.textContent   = val; };

  txt('lang-flag',       isFr ? '🇫🇷' : '🇮🇷');
  txt('lang-name',       isFr ? 'Français' : 'Farsi');
  css('nav-lessons',     isFr ? 'none' : '');
  txt('farsi101-title',  isFr ? 'Français' : 'Farsi 101');
  css('subnav-grammar',  isFr ? 'none' : '');
  css('subnav-vocab',    isFr ? 'none' : '');
  css('subnav-alphabet', isFr ? 'none' : '');
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
if (currentLang === 'farsi') {
  startLessonSession(getActiveLessonIdx());
} else {
  fcDeck = shuffle(getActiveVocab().map(card => ({ card, direction: 'recognition', isLesson: true })));
  fcIdx = 0; fcFlipped = false; fcCorrect = 0; fcDone = 0;
  const label = document.getElementById('fc-lesson-label');
  if (label) label.textContent = 'Français';
  updateFlashStats();
  showCurrentCard();
}
