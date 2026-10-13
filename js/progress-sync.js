/* ── LERNSTAND → TRAWESKO-BOT ──
   Meldet den Tagesstand pro Sprache (Karten, Übungen, Ziel erreicht, Streak) an
   Supabase (Funktion report_learning). Der Telegram-Bot „Trawesko“ liest ihn und
   erinnert um 20:00, falls das Tagesziel fehlt.

   Schreiben geht nur mit dem geheimen Gerätecode, den der Bot als Link schickt
   (…/#verbinden=CODE). Er wird nur in localStorage gespeichert, nie im Code.
   URL und Publishable Key sind öffentlich (wie in jeder Web-App) – ohne Gerätecode
   kann damit nichts geschrieben oder gelesen werden. */
const PS_URL    = 'https://frfejzluecbefkjqrqui.supabase.co';
const PS_ANON   = 'sb_publishable_hKWAfVhAHtkpOeFyJuNOhg_2bxzyO-A';
const PS_DEVICE = 'trawesko_device_key';
const PS_QUEUE  = 'trawesko_progress_queue';

let _psTimer = null;

function _psLoadQueue() {
  try { return JSON.parse(localStorage.getItem(PS_QUEUE)) || {}; } catch { return {}; }
}

function reportProgress(lang, s, met) {
  if (!localStorage.getItem(PS_DEVICE)) return;          // nicht verbunden → nichts senden
  const q = _psLoadQueue();
  q[lang + '|' + s.todayDate] = {
    p_lang: lang, p_day: s.todayDate, p_cards: s.todayVocab, p_exercises: s.todayExercises,
    p_goal_met: !!met, p_streak: s.streak,
  };
  localStorage.setItem(PS_QUEUE, JSON.stringify(q));
  clearTimeout(_psTimer);
  _psTimer = setTimeout(flushProgress, 1500);             // mehrere Karten kurz hintereinander bündeln
}

async function flushProgress() {
  const key = localStorage.getItem(PS_DEVICE);
  if (!key || !navigator.onLine) return;
  const q = _psLoadQueue();
  for (const [id, payload] of Object.entries(q)) {
    try {
      const res = await fetch(PS_URL + '/rest/v1/rpc/report_learning', {
        method: 'POST',
        headers: { 'apikey': PS_ANON, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_key: key, ...payload }),
      });
      if (res.ok || res.status === 400) {                 // 400 = abgelehnt (z. B. zu alter Tag) → verwerfen
        const cur = _psLoadQueue(); delete cur[id];
        localStorage.setItem(PS_QUEUE, JSON.stringify(cur));
      }
    } catch { return; }                                   // offline/Netzfehler → später erneut
  }
}

/* Aktuellen Stand aller Sprachen einmal melden (nach dem Verbinden) */
function _psReportAll() {
  ['farsi', 'spanish', 'french'].forEach(lang => {
    const s = _refreshDay(loadStreakData(lang));
    if (s.todayVocab || s.todayExercises || s.streak) reportProgress(lang, s, goalMet(s, lang));
  });
}

(function captureDeviceKey() {
  const m = location.hash.match(/verbinden=([A-Za-z0-9_-]{16,})/);
  if (!m) return;
  localStorage.setItem(PS_DEVICE, m[1]);
  history.replaceState(null, '', location.pathname + location.search);   // Code aus der Adresszeile entfernen
  const el = document.createElement('div');
  el.className = 'streak-milestone';
  el.textContent = 'Mit Trawesko verbunden ✓';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
  setTimeout(_psReportAll, 500);
})();

window.addEventListener('online', flushProgress);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') flushProgress(); });
setTimeout(flushProgress, 2000);
