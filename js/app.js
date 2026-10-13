/* ── THEME ── */
function toggleTheme() {
  const html   = document.documentElement;
  const isDark = html.classList.contains('theme-dark');
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
  const isDark = html.classList.contains('theme-dark');
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

function _activateScreen(id, navId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => {
    const on = b.id === navId;
    b.classList.toggle('active', on);
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function show(id, btn) {
  _activateScreen(id, btn ? btn.id : null);
}

/* Unterseiten von „Nachschlagen“ (Grammatik, Redewendungen, Wortschatz, Alphabet) */
function showSub(id) {
  _activateScreen(id, 'nav-lookup');
}

function showLookup() {
  _activateScreen('lookup', 'nav-lookup');
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
  initStreak();          // Streak und Tagesziel der neuen Sprache anzeigen
  buildGrammar();
  try { buildUebungen(); } catch (e) { /* Übungsskripte laden nach app.js */ }
  buildPhrases();
  buildLessonsScreen();
  startLessonSession(getActiveLessonIdx());
  show('flash', document.getElementById('nav-flash'));
}

const LANG_CODES = { farsi: 'FA', french: 'FR', spanish: 'ES' };
const LANG_NAMES = { farsi: 'Farsi', french: 'Französisch', spanish: 'Spanisch' };

function _applyLangUI() {
  const isFarsi = currentLang === 'farsi';
  // Übungen und Nachschlagen: Farsi und Spanisch (Französisch noch nicht)
  const hasExercises = isFarsi || currentLang === 'spanish';
  ['nav-uebungen', 'nav-lookup'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.style.display = hasExercises ? '' : 'none';
  });
  // Wortschatz und Alphabet gibt es nur für Farsi
  ['subnav-vocab', 'subnav-alphabet'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.style.display = isFarsi ? '' : 'none';
  });
  const bar = document.querySelector('.tabbar');
  if (bar) bar.style.setProperty('--tabs', hasExercises ? 4 : 2);
  const lb = document.getElementById('lang-btn');
  if (lb) {
    lb.textContent = LANG_CODES[currentLang] || 'FA';
    lb.setAttribute('aria-label', 'Sprache wählen: ' + (LANG_NAMES[currentLang] || 'Farsi'));
  }
}

/* ── INIT ── */
_updateThemeBtn();
initStreak();
initLessons();
buildLessonsScreen();
buildVocabTopics();
buildGrammar();
buildPhrases();
buildAlphabet();
_applyLangUI();
startLessonSession(getActiveLessonIdx());
try { buildUebungen(); } catch(e) { console.error('buildUebungen failed:', e); }
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
