/* ── ALPHABET DATA ── */
const ALPHABET = [
  { char: 'ا', name: 'Alef',  roman: 'a / â',  hint: 'Wie "a" in "Art"',          forms: ['ا', '—', '—', 'ـا'] },
  { char: 'ب', name: 'Be',    roman: 'b',       hint: 'Wie "b" in "Ball"',         forms: ['ب', 'بـ', 'ـبـ', 'ـب'] },
  { char: 'پ', name: 'Pe',    roman: 'p',       hint: 'Wie "p" in "Post"',         forms: ['پ', 'پـ', 'ـپـ', 'ـپ'] },
  { char: 'ت', name: 'Te',    roman: 't',       hint: 'Wie "t" in "Tisch"',        forms: ['ت', 'تـ', 'ـتـ', 'ـت'] },
  { char: 'ث', name: 'Se',    roman: 's',       hint: 'Wie "s" in "Sonne"',        forms: ['ث', 'ثـ', 'ـثـ', 'ـث'] },
  { char: 'ج', name: 'Jim',   roman: 'j',       hint: 'Wie "dsch" in "Dschungel"', forms: ['ج', 'جـ', 'ـجـ', 'ـج'] },
  { char: 'چ', name: 'Tsche', roman: 'tsch',    hint: 'Wie "tsch" in "Tschüss"',   forms: ['چ', 'چـ', 'ـچـ', 'ـچ'] },
  { char: 'ح', name: 'He',    roman: 'h',       hint: 'Gehauchtes "h"',            forms: ['ح', 'حـ', 'ـحـ', 'ـح'] },
  { char: 'خ', name: 'Khe',   roman: 'kh',      hint: 'Wie "ch" in "Bach"',        forms: ['خ', 'خـ', 'ـخـ', 'ـخ'] },
  { char: 'د', name: 'Dal',   roman: 'd',       hint: 'Wie "d" in "Dach"',         forms: ['د', '—', '—', 'ـد'] },
  { char: 'ذ', name: 'Zal',   roman: 'z',       hint: 'Wie "s" in "Sonne"',        forms: ['ذ', '—', '—', 'ـذ'] },
  { char: 'ر', name: 'Re',    roman: 'r',       hint: 'Gerolltes "r"',             forms: ['ر', '—', '—', 'ـر'] },
  { char: 'ز', name: 'Ze',    roman: 'z',       hint: 'Wie "s" in "Sonne"',        forms: ['ز', '—', '—', 'ـز'] },
  { char: 'ژ', name: 'Zhe',   roman: 'zh',      hint: 'Wie "j" in "Journal"',      forms: ['ژ', '—', '—', 'ـژ'] },
  { char: 'س', name: 'Sin',   roman: 's',       hint: 'Wie "s" in "Sonne"',        forms: ['س', 'سـ', 'ـسـ', 'ـس'] },
  { char: 'ش', name: 'Schin', roman: 'sch',     hint: 'Wie "sch" in "Schule"',     forms: ['ش', 'شـ', 'ـشـ', 'ـش'] },
  { char: 'ص', name: 'Sad',   roman: 's',       hint: 'Betontes "s"',              forms: ['ص', 'صـ', 'ـصـ', 'ـص'] },
  { char: 'ض', name: 'Zad',   roman: 'z',       hint: 'Betontes "z"',              forms: ['ض', 'ضـ', 'ـضـ', 'ـض'] },
  { char: 'ط', name: 'Ta',    roman: 't',       hint: 'Betontes "t"',              forms: ['ط', 'طـ', 'ـطـ', 'ـط'] },
  { char: 'ظ', name: 'Za',    roman: 'z',       hint: 'Betontes "z"',              forms: ['ظ', 'ظـ', 'ـظـ', 'ـظ'] },
  { char: 'ع', name: 'Ain',   roman: '\'',      hint: 'Kehllaut, tief aus der Kehle', forms: ['ع', 'عـ', 'ـعـ', 'ـع'] },
  { char: 'غ', name: 'Ghain', roman: 'gh',      hint: 'Wie "r" im Pariser Akzent', forms: ['غ', 'غـ', 'ـغـ', 'ـغ'] },
  { char: 'ف', name: 'Fe',    roman: 'f',       hint: 'Wie "f" in "Fisch"',        forms: ['ف', 'فـ', 'ـفـ', 'ـف'] },
  { char: 'ق', name: 'Qaf',   roman: 'q',       hint: 'Tiefes "k" aus der Kehle',  forms: ['ق', 'قـ', 'ـقـ', 'ـق'] },
  { char: 'ک', name: 'Kaf',   roman: 'k',       hint: 'Wie "k" in "Katze"',        forms: ['ک', 'کـ', 'ـکـ', 'ـک'] },
  { char: 'گ', name: 'Gaf',   roman: 'g',       hint: 'Wie "g" in "Garten"',       forms: ['گ', 'گـ', 'ـگـ', 'ـگ'] },
  { char: 'ل', name: 'Lam',   roman: 'l',       hint: 'Wie "l" in "Lampe"',        forms: ['ل', 'لـ', 'ـلـ', 'ـل'] },
  { char: 'م', name: 'Mim',   roman: 'm',       hint: 'Wie "m" in "Maus"',         forms: ['م', 'مـ', 'ـمـ', 'ـم'] },
  { char: 'ن', name: 'Nun',   roman: 'n',       hint: 'Wie "n" in "Nacht"',        forms: ['ن', 'نـ', 'ـنـ', 'ـن'] },
  { char: 'و', name: 'Waw',   roman: 'v / u',   hint: 'Wie "w" in "Wasser" oder "u"', forms: ['و', '—', '—', 'ـو'] },
  { char: 'ه', name: 'He',    roman: 'h',       hint: 'Wie "h" in "Haus"',         forms: ['ه', 'هـ', 'ـهـ', 'ـه'] },
  { char: 'ی', name: 'Ye',    roman: 'y / i',   hint: 'Wie "j" in "Jahr" oder "i"', forms: ['ی', 'یـ', 'ـیـ', 'ـی'] },
];

/* ── STATE ── */
let abcIdx = 0;
let abcDrawing = false;
let abcCanvas, abcCtx;

/* ── BUILD ── */
function buildAlphabet() {
  document.getElementById('alphabet-content').innerHTML = `
    <div class="abc-progress" id="abc-progress">Buchstabe 1 / ${ALPHABET.length}</div>
    <canvas class="abc-canvas" id="abc-canvas"></canvas>
    <div class="abc-actions">
      <button class="btn" onclick="abcClear()" style="padding:8px 18px;font-size:13px">Löschen</button>
      <button class="btn btn-primary" onclick="abcPrev()" style="padding:8px 18px;font-size:13px">← Zurück</button>
      <button class="btn btn-primary" onclick="abcNext()" style="padding:8px 18px;font-size:13px">Weiter →</button>
    </div>
  `;

  abcCanvas = document.getElementById('abc-canvas');
  abcCtx    = abcCanvas.getContext('2d');

  /* DPR scaling for sharp retina rendering */
  const dpr = window.devicePixelRatio || 1;
  const size = 300;
  abcCanvas.width  = size * dpr;
  abcCanvas.height = size * dpr;
  abcCtx.scale(dpr, dpr);

  abcCanvas.addEventListener('pointerdown',  abcStartDraw, { passive: false });
  abcCanvas.addEventListener('pointermove',  abcDraw,      { passive: false });
  abcCanvas.addEventListener('pointerup',    abcEndDraw,   { passive: false });
  abcCanvas.addEventListener('pointercancel',abcEndDraw,   { passive: false });

  showLetter(0);
}

/* ── LETTER DISPLAY ── */
function showLetter(idx) {
  abcIdx = idx;
  document.getElementById('abc-progress').textContent = `Buchstabe ${idx + 1} / ${ALPHABET.length}`;
  abcDrawGuide();
}

/* ── CANVAS GUIDE ── */
function abcDrawGuide() {
  const ctx = abcCtx;
  ctx.clearRect(0, 0, 300, 300);

  /* Faint Arabic letter */
  ctx.font         = '190px serif';
  ctx.direction    = 'rtl';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle    = 'rgba(127, 119, 221, 0.13)';
  ctx.fillText(ALPHABET[abcIdx].char, 150, 150);

  /* Roman transcription — bottom-left corner */
  ctx.font         = 'bold 22px system-ui, sans-serif';
  ctx.direction    = 'ltr';
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle    = 'rgba(127, 119, 221, 0.35)';
  ctx.fillText(ALPHABET[abcIdx].roman, 14, 286);
}

/* ── DRAWING ── */
function abcStartDraw(e) {
  e.preventDefault();
  abcDrawing = true;
  const pos = abcGetPos(e);
  abcCtx.beginPath();
  abcCtx.moveTo(pos.x, pos.y);
}

function abcDraw(e) {
  e.preventDefault();
  if (!abcDrawing) return;
  const pos = abcGetPos(e);
  abcCtx.lineTo(pos.x, pos.y);
  abcCtx.strokeStyle = '#5B52C2';  /* --purple-600 */
  abcCtx.lineWidth   = 5;
  abcCtx.lineCap     = 'round';
  abcCtx.lineJoin    = 'round';
  abcCtx.stroke();
}

function abcEndDraw(e) {
  e.preventDefault();
  abcDrawing = false;
  abcCtx.beginPath();
}

function abcGetPos(e) {
  const rect  = abcCanvas.getBoundingClientRect();
  const scaleX = 300 / rect.width;
  const scaleY = 300 / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top)  * scaleY,
  };
}

/* ── NAVIGATION ── */
function abcNext()  { showLetter(abcIdx < ALPHABET.length - 1 ? abcIdx + 1 : 0); }
function abcPrev()  { showLetter(abcIdx > 0 ? abcIdx - 1 : ALPHABET.length - 1); }
function abcClear() { abcDrawGuide(); }
