/* PWA-Install-Hinweis: Chromium (beforeinstallprompt) + iOS/Safari (manuell zum Home-Bildschirm) */
(function () {
  var STORAGE_KEY = 'farsi_pwa_install_banner';

  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true
    );
  }

  function neverShow() {
    return localStorage.getItem(STORAGE_KEY) === 'never';
  }

  function isIosLike() {
    var ua = navigator.userAgent || '';
    if (/iPad|iPhone|iPod/.test(ua)) return true;
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true;
    return false;
  }

  var banner = document.getElementById('pwa-install-banner');
  var textEl = document.getElementById('pwa-install-text');
  var primaryBtn = document.getElementById('pwa-install-primary');
  var dismissBtn = document.getElementById('pwa-install-dismiss');
  var neverCb = document.getElementById('pwa-install-never');
  var deferredPrompt = null;

  if (!banner || !textEl || !primaryBtn || !dismissBtn || !neverCb) return;

  if (neverShow() || isStandalone()) return;

  function closeBanner() {
    if (neverCb.checked) localStorage.setItem(STORAGE_KEY, 'never');
    banner.classList.remove('pwa-install-banner--open');
    banner.hidden = true;
    document.body.classList.remove('pwa-install-banner-active');
  }

  function showBanner(mode) {
    banner.hidden = false;
    banner.classList.add('pwa-install-banner--open');
    document.body.classList.add('pwa-install-banner-active');
    if (mode === 'ios') {
      banner.classList.remove('pwa-install-banner--chromium');
      textEl.innerHTML =
        'Tippe unten auf <strong>Teilen</strong> <span aria-hidden="true">(□↑)</span> und wähle ' +
        '<strong>„Zum Home-Bildschirm“</strong> bzw. <strong>Add to Home Screen</strong> — ' +
        'dann öffnet sich die App wie eine normale App mit Icon.';
      primaryBtn.hidden = true;
    } else {
      banner.classList.add('pwa-install-banner--chromium');
      textEl.textContent =
        'Installiere die App für schnelleren Zugriff, eigenes Icon und Nutzung wie eine normale App (inkl. Offline, sobald geladen).';
      primaryBtn.hidden = false;
    }
  }

  function wireDismiss() {
    dismissBtn.addEventListener('click', function () {
      closeBanner();
    });
    var backdrop = document.getElementById('pwa-install-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeBanner();
      });
    }
  }

  primaryBtn.addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;
      closeBanner();
    });
  });

  wireDismiss();

  window.addEventListener('appinstalled', function () {
    localStorage.setItem(STORAGE_KEY, 'never');
    banner.classList.remove('pwa-install-banner--open');
    banner.hidden = true;
    document.body.classList.remove('pwa-install-banner-active');
  });

  if (isIosLike()) {
    requestAnimationFrame(function () {
      showBanner('ios');
    });
    return;
  }

  window.addEventListener(
    'beforeinstallprompt',
    function (e) {
      e.preventDefault();
      deferredPrompt = e;
      if (banner.hidden || !banner.classList.contains('pwa-install-banner--open')) showBanner('chromium');
    },
    { once: false }
  );

  /* Falls das Event verzögert kommt, einmal kurz warten (ohne erneutes Popup wenn schon zu) */
  setTimeout(function () {
    if (neverShow() || isStandalone()) return;
    if (deferredPrompt && !banner.classList.contains('pwa-install-banner--open')) showBanner('chromium');
  }, 800);
})();
