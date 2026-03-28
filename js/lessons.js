/* ── LESSONS DATA ── */
const LESSONS = [
  // ── Grundlagen (lessons 0–4): function words + high-frequency content ──
  {
    id:  0,
    theme: 'Grundlagen 1',
    words: [1,3,4,5,6,7,8,10,2,9,14,16,17,23,24,37,42,56,30,33],
  },
  {
    id:  1,
    theme: 'Grundlagen 2',
    words: [11,13,15,21,25,26,31,32,22,27,34,38,39,40,47,28,29,55,46,53],
  },
  {
    id:  2,
    theme: 'Grundlagen 3',
    words: [36,41,44,54,58,64,69,77,51,52,19,62,63,65,59,60,61,99,57,20],
  },
  {
    id:  3,
    theme: 'Grundlagen 4',
    words: [81,82,84,102,110,116,118,131,85,86,88,89,90,91,92,93,111,112,115,87],
  },
  {
    id:  4,
    theme: 'Grundlagen 5',
    words: [141,143,148,157,164,228,246,258,149,150,151,152,153,154,155,156,158,159,160,162],
  },

  // ── Thematische Lektionen (5–49) ──
  {
    id:  5,
    theme: 'Familie',
    words: [282,214,459,527,467,859,883,930,122,678,496,976,870,135,120,800,105,130,381,674],
  },
  {
    id:  6,
    theme: 'Essen & Trinken',
    words: [686,179,688,365,422,530,855,599,517,721,438,481,512,593,769,773,853,740,178,142],
  },
  {
    id:  7,
    theme: 'Zeit & Kalender',
    words: [79,83,242,269,414,476,499,511,548,552,583,584,656,707,816,897,940,418,410,388],
  },
  {
    id:  8,
    theme: 'Körper & Gesundheit',
    words: [66,216,587,590,628,566,603,934,875,945,762,888,531,393,633,910,442,596,879,892],
  },
  {
    id:  9,
    theme: 'Krankenhaus & Medizin',
    words: [375,840,847,745,857,903,871,485,861,882,839,890,719,727,639,932,543,401,482,829],
  },
  {
    id: 10,
    theme: 'Arbeit & Beruf',
    words: [119,138,484,708,715,978,661,831,503,520,231,703,519,900,392,687,557,578,841,380],
  },
  {
    id: 11,
    theme: 'Stadt & Wohnen',
    words: [358,758,797,627,665,796,814,207,367,448,654,210,301,799,374,308,353,559,666,772],
  },
  {
    id: 12,
    theme: 'Reise & Transport',
    words: [344,426,634,873,823,690,487,575,632,777,884,993,136,343,635,698,863,702,536,439],
  },
  {
    id: 13,
    theme: 'Verkehr & Richtungen',
    words: [582,601,541,806,926,824,630,550,683,551,625,177,94,260,265,101,790,775,821,243],
  },
  {
    id: 14,
    theme: 'Natur & Wetter',
    words: [574,372,669,837,783,728,506,613,407,229,704,544,364,370,748,620,413,604,474,818],
  },
  {
    id: 15,
    theme: 'Tiere & Pflanzen',
    words: [826,851,286,588,872,351,324,572,606,502,290,742,339,920,898,607,730,568,200,564],
  },
  {
    id: 16,
    theme: 'Schule & Bildung',
    words: [419,493,312,336,521,849,780,457,383,522,315,376,423,886,479,333,362,280,947,868],
  },
  {
    id: 17,
    theme: 'Sport & Aktivitäten',
    words: [490,384,533,285,830,622,923,961,880,924,878,447,489,540,513,514,554,297,191,672],
  },
  {
    id: 18,
    theme: 'Einkaufen & Geld',
    words: [472,473,330,763,989,938,706,718,657,477,516,349,221,222,425,580,581,755,957,535],
  },
  {
    id: 19,
    theme: 'Emotionen & Gefühle',
    words: [547,402,972,973,975,983,984,889,619,616,787,710,741,743,546,717,646,694,695,948],
  },
  {
    id: 20,
    theme: 'Charakter & Eigenschaften',
    words: [681,642,528,445,510,731,928,929,294,441,673,949,432,255,515,100,108,234,199,416],
  },
  {
    id: 21,
    theme: 'Politik & Regierung',
    words: [223,187,219,244,337,354,133,289,182,523,524,412,420,538,103,498,253,471,470,801],
  },
  {
    id: 22,
    theme: 'Recht & Gesellschaft',
    words: [165,172,371,171,321,235,651,846,733,735,400,647,757,759,722,754,598,933,556,319],
  },
  {
    id: 23,
    theme: 'Medien & Kommunikation',
    words: [232,256,600,215,692,208,209,629,254,397,409,390,562,794,303,408,411,563,713,893],
  },
  {
    id: 24,
    theme: 'Technologie',
    words: [464,465,495,779,675,992,509,807,864,347,134,273,671,591,737,803,922,786,667,403],
  },
  {
    id: 25,
    theme: 'Religion & Tradition',
    words: [276,360,466,788,460,691,677,626,684,894,896,912,399,291,865,866,323,558,676,950],
  },
  {
    id: 26,
    theme: 'Geschichte & Vergangenheit',
    words: [78,332,589,987,348,569,645,267,283,132,126,230,443,781,648,570,274,275,532,180],
  },
  {
    id: 27,
    theme: 'Wissenschaft & Forschung',
    words: [798,848,921,586,595,597,436,325,279,969,480,610,475,300,567,363,361,366,181,80],
  },
  {
    id: 28,
    theme: 'Wirtschaft & Finanzen',
    words: [537,453,766,767,709,925,974,749,917,844,854,999,226,266,251,245,225,224,236,204],
  },
  {
    id: 29,
    theme: 'Internationale Beziehungen',
    words: [576,107,450,529,458,594,611,621,712,867,845,856,913,389,433,518,1000,699,549,960],
  },
  {
    id: 30,
    theme: 'Militär & Sicherheit',
    words: [263,302,486,887,553,534,789,946,927,507,404,357,911,488,483,429,310,452,198,561],
  },
  {
    id: 31,
    theme: 'Landwirtschaft & Umwelt',
    words: [782,233,140,109,161,278,795,862,834,815,640,428,525,500,96,67,68,70,71,72],
  },
  {
    id: 32,
    theme: 'Kleidung & Mode',
    words: [951,720,885,451,385,97,144,117,184,195,281,309,73,74,75,76,45,48,49,50],
  },
  {
    id: 33,
    theme: 'Unterhaltung & Freizeit',
    words: [378,617,662,685,869,971,738,560,700,201,218,298,318,212,760,386,387,248,697,98],
  },
  {
    id: 34,
    theme: 'Sprache & Literatur',
    words: [394,352,852,346,368,213,726,637,968,478,981,952,980,820,623,314,174,176,655,379],
  },
  {
    id: 35,
    theme: 'Philosophie & Ideen',
    words: [356,175,173,262,292,196,355,608,320,970,643,284,113,463,322,612,427,461,491,492],
  },
  {
    id: 36,
    theme: 'Soziale Fragen',
    words: [335,304,341,306,359,936,190,832,835,327,293,827,909,908,843,329,238,239,326,168],
  },
  {
    id: 37,
    theme: 'Haushalt & Alltag',
    words: [417,918,128,202,505,585,194,774,147,192,169,305,217,277,257,658,670,614,462,331],
  },
  {
    id: 38,
    theme: 'Körperbeschreibung',
    words: [958,183,446,435,440,579,444,396,739,405,421,307,227,240,241,167,434,455,618,964],
  },
  {
    id: 39,
    theme: 'Zahlen & Mengen',
    words: [391,877,902,905,340,345,342,338,449,456,188,431,571,641,631,723,734,650,836,664],
  },
  {
    id: 40,
    theme: 'Orte & Gebäude',
    words: [166,185,206,249,252,264,268,270,287,288,311,313,316,317,415,424,430,437,539,542],
  },
  {
    id: 41,
    theme: 'Bewegung & Richtung',
    words: [545,565,573,577,592,602,605,609,615,636,638,644,649,652,653,659,660,663,668,682],
  },
  {
    id: 42,
    theme: 'Abstrakte Konzepte 1',
    words: [679,689,693,696,701,705,711,714,716,724,725,729,732,736,744,746,747,750,751,752],
  },
  {
    id: 43,
    theme: 'Abstrakte Konzepte 2',
    words: [753,756,761,764,765,768,770,771,776,778,784,785,791,792,793,802,804,805,808,809],
  },
  {
    id: 44,
    theme: 'Politische Begriffe 2',
    words: [810,811,812,813,817,819,822,825,828,833,838,842,850,858,860,874,876,881,891,895],
  },
  {
    id: 45,
    theme: 'Wirtschaftsvokabular 2',
    words: [899,901,904,906,907,914,915,916,919,931,935,937,939,941,942,943,944,953,954,955],
  },
  {
    id: 46,
    theme: 'Kulturelles Leben',
    words: [956,959,962,963,965,966,967,977,979,982,985,986,988,990,991,994,995,996,997,998],
  },
  {
    id: 47,
    theme: 'Medizinisches Vokabular 2',
    words: [12,18,35,43,95,104,106,114,121,123,124,125,127,129,137,139,145,146,163,170],
  },
  {
    id: 48,
    theme: 'Akademisches Vokabular',
    words: [186,189,193,197,203,205,211,220,237,247,250,259,261,271,272,295,296,299,328,334],
  },
  {
    id: 49,
    theme: 'Fortgeschrittenes Vokabular',
    words: [350,369,373,377,382,395,398,406,454,468,469,494,497,501,504,508,526,555,680,624],
  },
];

/* ── LESSON STATE ── */
const LESSON_KEY = 'farsi_lesson_state';

function loadLessonState() {
  try {
    return JSON.parse(localStorage.getItem(LESSON_KEY)) || { unlocked: [0], mastered: [] };
  } catch { return { unlocked: [0], mastered: [] }; }
}

function saveLessonState(s) {
  localStorage.setItem(LESSON_KEY, JSON.stringify(s));
}

function initLessons() {
  const s = loadLessonState();
  if (!s.unlocked || s.unlocked.length === 0) {
    saveLessonState({ unlocked: [0], mastered: [] });
  }
}

function getActiveLessonIdx() {
  const s = loadLessonState();
  const active = s.unlocked.find(i => !s.mastered.includes(i));
  return active !== undefined ? active : (s.mastered.length > 0 ? Math.max(...s.mastered) : 0);
}

function getLessonStatus(idx) {
  const s = loadLessonState();
  if (s.mastered.includes(idx)) return 'mastered';
  if (s.unlocked.includes(idx)) return 'active';
  return 'locked';
}

function markMastered(idx) {
  const s = loadLessonState();
  if (!s.mastered.includes(idx)) s.mastered.push(idx);
  const nextIdx = idx + 1;
  if (nextIdx < LESSONS.length && !s.unlocked.includes(nextIdx)) {
    s.unlocked.push(nextIdx);
  }
  saveLessonState(s);
}

function getLessonWords(idx) {
  const lesson = LESSONS[idx];
  if (!lesson) return [];
  return lesson.words.map(id => VOCAB.find(v => v.id === id)).filter(Boolean);
}

function getReviewPool(excludeIdx) {
  const s = loadLessonState();
  const pool = [];
  s.mastered.forEach(idx => {
    if (idx !== excludeIdx) {
      pool.push(...getLessonWords(idx));
    }
  });
  return pool;
}

/* ── LESSONS SCREEN ── */
function buildLessonsScreen() {
  const grid = document.getElementById('lessons-grid');
  if (!grid) return;
  const activeIdx = getActiveLessonIdx();
  grid.innerHTML = LESSONS.map((lesson, idx) => {
    const status = getLessonStatus(idx);
    const isActive = idx === activeIdx;
    const statusLabel = status === 'mastered' ? '✓ Gemeistert' : status === 'active' ? 'In Bearbeitung' : '🔒 Gesperrt';
    const cls = ['lesson-card', status === 'locked' ? 'locked' : '', status === 'mastered' ? 'mastered' : '', isActive ? 'is-active' : ''].filter(Boolean).join(' ');
    const clickHandler = status !== 'locked' ? `onclick="startLessonSession(${idx})"` : '';
    return `<div class="${cls}" ${clickHandler}>
  <div class="lesson-number">#${idx + 1}</div>
  <div class="lesson-theme">${lesson.theme}</div>
  <div class="lesson-count">20 Wörter</div>
  <span class="lesson-status-badge ${status}">${statusLabel}</span>
</div>`;
  }).join('');
}
