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

const _THEME_ICON_SUN =
  '<svg class="theme-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
const _THEME_ICON_MOON =
  '<svg class="theme-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

function _updateThemeBtn() {
  const btn    = document.getElementById('theme-toggle');
  if (!btn) return;
  const html   = document.documentElement;
  const isDark = html.classList.contains('theme-dark') ||
    (!html.classList.contains('theme-light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  btn.innerHTML = isDark ? _THEME_ICON_SUN : _THEME_ICON_MOON;
}

/* ── NAVIGATION ── */
function _setGlobe(visible) {
  const btn = document.getElementById('globe-btn');
  if (btn) btn.style.display = visible ? 'flex' : 'none';
}

/** Gleitender lila Indikator — ohne Klick keine transition (s. nav-slider--animate) */
function _updateNavSlider() {
  const slider = document.getElementById('nav-slider');
  const nav = document.querySelector('.nav');
  const activeBtn = document.querySelector('.nav-btn.active');
  if (!slider || !nav) return;
  if (!activeBtn) {
    slider.style.opacity = '0';
    return;
  }
  const navRect = nav.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  slider.style.opacity = '1';
  slider.style.left = btnRect.left - navRect.left + nav.scrollLeft + 'px';
  slider.style.top = btnRect.top - navRect.top + nav.scrollTop + 'px';
  slider.style.width = btnRect.width + 'px';
  slider.style.height = btnRect.height + 'px';
}

function show(id, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  _updateNavSlider();
  _setGlobe(id === 'flash');
}

function showSub(id, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  _updateNavSlider();
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
  const iranBtn = document.getElementById('nav-iran');
  if (iranBtn) iranBtn.style.display = isFarsi ? '' : 'none';
  const uebBtn = document.getElementById('nav-uebungen');
  if (uebBtn) uebBtn.style.display = isFarsi ? '' : 'none';
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
buildIran().catch(console.error);
_applyLangUI();
startLessonSession(getActiveLessonIdx());
_updateNavSlider();
window.addEventListener('resize', _updateNavSlider);

/* Slider-Animation nur bei echtem Klick auf Haupt-Tabs — nicht bei show() aus startLessonSession/switchLanguage */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  nav.addEventListener(
    'click',
    function (e) {
      if (e.target.closest('.nav-btn')) {
        const s = document.getElementById('nav-slider');
        if (s) s.classList.add('nav-slider--animate');
      }
    },
    true
  );
})();
