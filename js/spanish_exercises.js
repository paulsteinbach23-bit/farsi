/* ── SPANISCH: GRAMMATIK-ÜBUNGEN (A1 + Ausblick A2) ──
   Progression nach dem Plan Curricular des Instituto Cervantes (Inventar A1/A2),
   aufbereitet in Kommunikationssituationen. Jedes Level beginnt mit einer
   Regelkarte (explizite Regel + Beispiele), danach Aufgaben mit Erklärung.
   ser vor estar; estar-Kontexte (Ort, Befinden) werden gezielt geübt.

   Aufgabentypen (wie bei Farsi):
     1 = Satz bauen  { de, tiles, solution }
     2 = Lücke       { sentence (mit ___), de?, options, correct }
     5 = Bedeutung   { source, options, correct }
     6 = Richtig?    { prompt, options, correct }
*/

const SPANISH_EXERCISE_PHASES = {
  1: 'Phase 1 — Sich vorstellen',
  2: 'Phase 2 — Alltag im Präsens',
  3: 'Phase 3 — Vorlieben, Zeit, Pläne',
  4: 'Phase 4 — Ausblick A2: Vergangenheit',
};

const SPANISH_EXERCISE_LEVELS = [

  /* ════════ PHASE 1 — SICH VORSTELLEN ════════ */

  {
    id: 1, phase: 1, title: 'Begrüßen & sich vorstellen',
    rule: {
      text: 'Zum Vorstellen brauchst du <b>me llamo</b> (ich heiße), <b>soy</b> (ich bin) und <b>soy de</b> (ich komme aus). Gefragt wird mit <b>¿Cómo te llamas?</b> (du) bzw. <b>¿Cómo se llama usted?</b> (Sie). Fragen und Ausrufe bekommen im Spanischen auch vorne ein umgedrehtes Zeichen: <b>¿…?</b> und <b>¡…!</b>',
      examples: [['¡Hola! Me llamo Paul.', 'Hallo! Ich heiße Paul.'], ['¿Cómo te llamas?', 'Wie heißt du?'], ['Soy de Alemania.', 'Ich komme aus Deutschland.']],
    },
    tasks: [
      { type:2, sentence:'¡___! ¿Qué tal?', de:'Hallo! Wie geht’s?', options:['Hola','Adiós','Gracias','Perdón'], correct:'Hola', explanation:'<b>Hola</b> ist die Standardbegrüßung, <b>¿Qué tal?</b> heißt „Wie geht’s?“.' },
      { type:2, sentence:'Me ___ Ana.', de:'Ich heiße Ana.', options:['llamo','llama','llamas','soy'], correct:'llamo', explanation:'<b>me llamo</b> = ich heiße (wörtlich: ich nenne mich).' },
      { type:1, de:'Wie heißt du?', tiles:['¿Cómo','te','llamas?','se'], solution:['¿Cómo','te','llamas?'], explanation:'<b>¿Cómo te llamas?</b> – informell (du). Formell: <b>¿Cómo se llama usted?</b>' },
      { type:2, sentence:'Soy ___ Alemania.', de:'Ich komme aus Deutschland.', options:['de','en','a','con'], correct:'de', explanation:'Herkunft: <b>ser de</b> + Land/Stadt.' },
      { type:5, source:'Mucho gusto.', options:['Freut mich.','Sehr gut.','Vielen Dank.','Bis bald.'], correct:'Freut mich.', explanation:'<b>Mucho gusto</b> / <b>Encantado(-a)</b> sagt man beim Kennenlernen.' },
      { type:6, prompt:'Welche Frage ist richtig geschrieben?', options:['¿De dónde eres?','De dónde eres?','¿De dónde eres¿','¡De dónde eres?'], correct:'¿De dónde eres?', explanation:'Fragen beginnen mit <b>¿</b> und enden mit <b>?</b>' },
      { type:2, sentence:'Buenos ___, señora García.', de:'Guten Tag (vormittags), Frau García.', options:['días','tardes','noches','día'], correct:'días', explanation:'<b>Buenos días</b> (bis mittags), <b>buenas tardes</b> (Nachmittag), <b>buenas noches</b> (Abend/Nacht).' },
      { type:1, de:'Ich komme aus Berlin.', tiles:['Soy','de','Berlín.','en'], solution:['Soy','de','Berlín.'], explanation:'<b>Soy de Berlín.</b> – das Subjekt <b>yo</b> lässt man meist weg.' },
      { type:5, source:'¡Hasta luego!', options:['Bis später!','Guten Appetit!','Herzlich willkommen!','Entschuldigung!'], correct:'Bis später!', explanation:'<b>Hasta luego</b> = bis später, <b>adiós</b> = tschüss.' },
    ],
  },

  {
    id: 2, phase: 1, title: 'Ich bin… – ser',
    rule: {
      text: '<b>ser</b> (sein) benutzt du für Identität, Herkunft, Nationalität und Beruf. Das Subjektpronomen lässt man meist weg, weil die Verbform die Person schon zeigt. <b>usted</b> (Sie) wird wie die 3. Person konjugiert. Berufe stehen <b>ohne Artikel</b>: <i>Soy médico.</i>',
      table: { headers: ['Person', 'ser'], rows: [['yo', 'soy'], ['tú', 'eres'], ['él / ella / usted', 'es'], ['nosotros/-as', 'somos'], ['vosotros/-as', 'sois'], ['ellos / ellas / ustedes', 'son']] },
      examples: [['Soy médico.', 'Ich bin Arzt.'], ['¿Eres alemana?', 'Bist du Deutsche?'], ['Somos de Madrid.', 'Wir sind aus Madrid.']],
    },
    tasks: [
      { type:2, sentence:'Yo ___ estudiante.', de:'Ich bin Student.', options:['soy','eres','es','somos'], correct:'soy', explanation:'yo → <b>soy</b>.' },
      { type:2, sentence:'¿Tú ___ de España?', de:'Bist du aus Spanien?', options:['eres','es','soy','sois'], correct:'eres', explanation:'tú → <b>eres</b>.' },
      { type:2, sentence:'María ___ profesora.', de:'María ist Lehrerin.', options:['es','son','eres','está'], correct:'es', explanation:'Beruf → <b>ser</b>. 3. Person Singular: <b>es</b>.' },
      { type:2, sentence:'Nosotros ___ alemanes.', options:['somos','sois','son','estamos'], correct:'somos', explanation:'nosotros → <b>somos</b>. Nationalität → ser.' },
      { type:1, de:'Ich bin Arzt.', tiles:['Soy','médico.','un','el'], solution:['Soy','médico.'], explanation:'Berufe nach <b>ser</b> stehen ohne Artikel: <b>Soy médico</b> (nicht *Soy un médico).' },
      { type:2, sentence:'Ellos ___ de México.', options:['son','somos','es','sois'], correct:'son', explanation:'ellos → <b>son</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Usted es muy amable.','Usted eres muy amable.','Usted sois muy amable.','Usted soy muy amable.'], correct:'Usted es muy amable.', explanation:'<b>usted</b> (Sie) wird wie <b>él/ella</b> konjugiert: <b>es</b>.' },
      { type:5, source:'¿Sois hermanos?', options:['Seid ihr Geschwister?','Sind sie Geschwister?','Sind wir Geschwister?','Bist du ein Bruder?'], correct:'Seid ihr Geschwister?', explanation:'<b>sois</b> = ihr seid (vosotros, vor allem in Spanien).' },
      { type:2, sentence:'¿Qué ___ tú? – Soy enfermero.', de:'Was bist du (beruflich)? – Ich bin Krankenpfleger.', options:['eres','es','haces','estás'], correct:'eres', explanation:'Frage nach dem Beruf: <b>¿Qué eres?</b> oder <b>¿A qué te dedicas?</b>' },
    ],
  },

  {
    id: 3, phase: 1, title: 'Artikel & Genus',
    rule: {
      text: 'Jedes Nomen ist <b>maskulin</b> oder <b>feminin</b>. Faustregel: auf <b>-o</b> meist maskulin, auf <b>-a</b> meist feminin. Ausnahmen lernst du mit Artikel: <b>el día, el problema, el mapa, la mano, la foto</b>. Wörter auf <b>-ción/-dad</b> sind feminin.',
      table: { headers: ['', 'maskulin', 'feminin'], rows: [['bestimmt (der/die)', 'el libro', 'la casa'], ['unbestimmt (ein/eine)', 'un libro', 'una casa']] },
      examples: [['el chico / la chica', 'der Junge / das Mädchen'], ['un día / una noche', 'ein Tag / eine Nacht'], ['la canción', 'das Lied']],
    },
    tasks: [
      { type:2, sentence:'___ libro', de:'das Buch', options:['el','la','los','una'], correct:'el', explanation:'<b>libro</b> endet auf -o → maskulin → <b>el</b>.' },
      { type:2, sentence:'___ mesa', de:'der Tisch', options:['la','el','un','los'], correct:'la', explanation:'<b>mesa</b> endet auf -a → feminin → <b>la</b>. Das Genus ist oft anders als im Deutschen!' },
      { type:2, sentence:'___ día', de:'der Tag', options:['el','la','una','las'], correct:'el', explanation:'Ausnahme: <b>el día</b> ist maskulin, obwohl es auf -a endet.' },
      { type:2, sentence:'___ mano', de:'die Hand', options:['la','el','un','los'], correct:'la', explanation:'Ausnahme: <b>la mano</b> ist feminin, obwohl es auf -o endet.' },
      { type:2, sentence:'Tengo ___ problema.', de:'Ich habe ein Problem.', options:['un','una','el','la'], correct:'un', explanation:'Wörter auf <b>-ma</b> aus dem Griechischen sind oft maskulin: <b>el problema, el tema, el sistema</b>.' },
      { type:2, sentence:'___ ciudad', de:'die Stadt', options:['la','el','un','los'], correct:'la', explanation:'Wörter auf <b>-dad</b> und <b>-ción</b> sind feminin: <b>la ciudad, la estación</b>.' },
      { type:6, prompt:'Welche Kombination ist richtig?', options:['una foto','un foto','una mapa','la problema'], correct:'una foto', explanation:'<b>la foto</b> (Kurzform von la fotografía) ist feminin. Richtig wäre auch: <b>un mapa, el problema</b>.' },
      { type:1, de:'Das ist ein Freund.', tiles:['Es','un','amigo.','una'], solution:['Es','un','amigo.'], explanation:'<b>amigo</b> (maskulin) → <b>un</b>. Eine Freundin: <b>una amiga</b>.' },
      { type:5, source:'la noche', options:['die Nacht','der Morgen','der Tag','das Jahr'], correct:'die Nacht', explanation:'<b>la noche</b> = die Nacht (feminin).' },
    ],
  },

  {
    id: 4, phase: 1, title: 'Plural & Adjektive',
    rule: {
      text: 'Plural: nach Vokal <b>-s</b> (<i>casa → casas</i>), nach Konsonant <b>-es</b> (<i>ciudad → ciudades</i>). Artikel: <b>los/las, unos/unas</b>. Adjektive stehen meist <b>nach</b> dem Nomen und passen sich in Genus und Zahl an. Adjektive auf <b>-e</b> oder Konsonant haben nur eine Form für beide Genera (<i>grande, fácil</i>).',
      table: { headers: ['', 'Singular', 'Plural'], rows: [['mask.', 'el coche rojo', 'los coches rojos'], ['fem.', 'la casa roja', 'las casas rojas'], ['-e / Konsonant', 'una ciudad grande', 'unas ciudades grandes']] },
      examples: [['un libro interesante', 'ein interessantes Buch'], ['las chicas simpáticas', 'die netten Mädchen']],
    },
    tasks: [
      { type:2, sentence:'dos ___', de:'zwei Häuser', options:['casas','casaes','casa','cases'], correct:'casas', explanation:'Nach Vokal: <b>+s</b>.' },
      { type:2, sentence:'tres ___', de:'drei Städte', options:['ciudades','ciudads','ciudad','ciudadas'], correct:'ciudades', explanation:'Nach Konsonant: <b>+es</b>.' },
      { type:2, sentence:'la casa ___', de:'das weiße Haus', options:['blanca','blanco','blancas','blancos'], correct:'blanca', explanation:'<b>casa</b> ist feminin Singular → <b>blanca</b>.' },
      { type:2, sentence:'los coches ___', de:'die roten Autos', options:['rojos','rojo','rojas','roja'], correct:'rojos', explanation:'maskulin Plural → <b>rojos</b>.' },
      { type:2, sentence:'una ciudad ___', de:'eine große Stadt', options:['grande','granda','grando','grandes'], correct:'grande', explanation:'Adjektive auf <b>-e</b> haben nur eine Form: <b>grande</b> (Plural: grandes).' },
      { type:1, de:'Die Mädchen sind nett.', tiles:['Las','chicas','son','simpáticas.','simpáticos.'], solution:['Las','chicas','son','simpáticas.'], explanation:'feminin Plural → <b>simpáticas</b>.' },
      { type:6, prompt:'Welcher Ausdruck ist richtig?', options:['unos libros interesantes','unos libros interesante','unas libros interesantes','unos libro interesantes'], correct:'unos libros interesantes', explanation:'Artikel, Nomen und Adjektiv stehen alle im Plural: <b>unos libros interesantes</b>.' },
      { type:2, sentence:'Mis amigas son ___.', de:'Meine Freundinnen sind Spanierinnen.', options:['españolas','españoles','española','español'], correct:'españolas', explanation:'Nationalität auf Konsonant: <b>español → española → españolas</b>.' },
      { type:5, source:'unos días tranquilos', options:['ein paar ruhige Tage','ruhige Nächte','ein ruhiger Tag','die ruhigen Tage'], correct:'ein paar ruhige Tage', explanation:'<b>unos/unas</b> = einige, ein paar.' },
    ],
  },

  {
    id: 5, phase: 1, title: 'Fragen & Verneinung',
    rule: {
      text: 'Verneint wird mit <b>no</b> direkt vor dem Verb: <i>No soy de aquí.</i> Fragewörter tragen einen <b>Akzent</b>: <b>qué</b> (was), <b>quién</b> (wer), <b>dónde</b> (wo), <b>de dónde</b> (woher), <b>cómo</b> (wie), <b>cuándo</b> (wann), <b>cuánto/-a/-os/-as</b> (wie viel/e), <b>por qué</b> (warum) – Antwort: <b>porque</b> (weil).',
      examples: [['¿Dónde vives?', 'Wo wohnst du?'], ['No hablo inglés.', 'Ich spreche kein Englisch.'], ['¿Por qué? – Porque es tarde.', 'Warum? – Weil es spät ist.']],
    },
    tasks: [
      { type:2, sentence:'¿___ vives? – En Hamburgo.', options:['Dónde','Qué','Quién','Cuándo'], correct:'Dónde', explanation:'Ort → <b>¿Dónde?</b>' },
      { type:2, sentence:'¿___ es? – Es mi hermano.', options:['Quién','Qué','Cómo','Dónde'], correct:'Quién', explanation:'Person → <b>¿Quién?</b>' },
      { type:2, sentence:'¿___ años tienes?', de:'Wie alt bist du?', options:['Cuántos','Cuántas','Cuánto','Qué'], correct:'Cuántos', explanation:'<b>años</b> ist maskulin Plural → <b>cuántos</b>.' },
      { type:1, de:'Ich bin nicht müde.', tiles:['No','estoy','cansado.','soy'], solution:['No','estoy','cansado.'], explanation:'<b>no</b> steht direkt vor dem Verb.' },
      { type:2, sentence:'¿___ estudias español? – Porque me gusta.', options:['Por qué','Porque','Qué','Cómo'], correct:'Por qué', explanation:'Frage: <b>¿Por qué?</b> (zwei Wörter, Akzent). Antwort: <b>porque</b> (ein Wort).' },
      { type:6, prompt:'Welche Verneinung ist richtig?', options:['No hablo alemán.','Hablo no alemán.','No hablo no alemán.','Hablo alemán no.'], correct:'No hablo alemán.', explanation:'<b>no</b> + Verb.' },
      { type:2, sentence:'¿___ te llamas?', options:['Cómo','Qué','Cuál','Quién'], correct:'Cómo', explanation:'Nach dem Namen fragt man mit <b>¿Cómo te llamas?</b>' },
      { type:5, source:'¿Cuándo llegas?', options:['Wann kommst du an?','Wie kommst du an?','Wo kommst du an?','Warum kommst du?'], correct:'Wann kommst du an?', explanation:'<b>¿Cuándo?</b> = wann.' },
      { type:2, sentence:'¿___ es esto? – Es un regalo.', options:['Qué','Quién','Dónde','Cuántos'], correct:'Qué', explanation:'Sache → <b>¿Qué?</b>' },
    ],
  },

  {
    id: 6, phase: 1, title: 'Wiederholung Phase 1',
    rule: {
      text: 'Gemischte Wiederholung: Vorstellen, <b>ser</b>, Artikel & Genus, Plural & Adjektive, Fragen & Verneinung. Wiederholen in Abständen festigt das Gelernte – mach dieses Level ruhig mehrmals.',
      examples: [['Me llamo Lucía y soy de Sevilla.', 'Ich heiße Lucía und komme aus Sevilla.'], ['No somos estudiantes.', 'Wir sind keine Studenten.']],
    },
    tasks: [
      { type:2, sentence:'Ellas ___ de Colombia.', options:['son','es','somos','están'], correct:'son', explanation:'Herkunft → ser; ellas → <b>son</b>.' },
      { type:2, sentence:'___ problema es grave.', options:['El','La','Un','Una'], correct:'El', explanation:'<b>el problema</b> – maskulin.' },
      { type:2, sentence:'las ciudades ___', de:'die schönen Städte', options:['bonitas','bonitos','bonita','bonito'], correct:'bonitas', explanation:'feminin Plural → <b>bonitas</b>.' },
      { type:1, de:'Woher kommst du?', tiles:['¿De','dónde','eres?','estás?'], solution:['¿De','dónde','eres?'], explanation:'Herkunft → <b>ser de</b>: <b>¿De dónde eres?</b>' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Mi madre es enfermera.','Mi madre es una enfermera simpático.','Mi madre son enfermera.','Mi madre está enfermera.'], correct:'Mi madre es enfermera.', explanation:'Beruf: <b>ser</b> + Beruf ohne Artikel.' },
      { type:2, sentence:'¿___ personas hay?', de:'Wie viele Personen sind da?', options:['Cuántas','Cuántos','Cuánta','Qué'], correct:'Cuántas', explanation:'<b>personas</b> ist feminin Plural → <b>cuántas</b>.' },
      { type:5, source:'No es mi coche.', options:['Das ist nicht mein Auto.','Mein Auto ist nicht da.','Ich habe kein Auto.','Das ist mein Auto.'], correct:'Das ist nicht mein Auto.', explanation:'<b>no</b> vor dem Verb verneint den Satz.' },
      { type:2, sentence:'Vosotros ___ muy simpáticos.', options:['sois','son','somos','eres'], correct:'sois', explanation:'vosotros → <b>sois</b>.' },
      { type:1, de:'Ich heiße Paul.', tiles:['Me','llamo','Paul.','soy'], solution:['Me','llamo','Paul.'], explanation:'<b>Me llamo</b> + Name. Auch möglich: <b>Soy Paul.</b>' },
    ],
  },

  /* ════════ PHASE 2 — ALLTAG IM PRÄSENS ════════ */

  {
    id: 7, phase: 2, title: 'Verben auf -ar',
    rule: {
      text: 'Regelmäßige Verben auf <b>-ar</b>: Endung <b>-ar</b> streichen und die Personalendung anhängen. Das Präsens steht für Gegenwart und Gewohnheiten (<i>Trabajo en un hospital.</i>).',
      table: { headers: ['Person', 'hablar (sprechen)', 'Endung'], rows: [['yo', 'hablo', '-o'], ['tú', 'hablas', '-as'], ['él/ella/usted', 'habla', '-a'], ['nosotros', 'hablamos', '-amos'], ['vosotros', 'habláis', '-áis'], ['ellos/ustedes', 'hablan', '-an']] },
      examples: [['Trabajo en Hamburgo.', 'Ich arbeite in Hamburg.'], ['¿Hablas español?', 'Sprichst du Spanisch?']],
    },
    tasks: [
      { type:2, sentence:'Yo ___ en un hospital.', de:'Ich arbeite in einem Krankenhaus.', options:['trabajo','trabajas','trabaja','trabajamos'], correct:'trabajo', explanation:'yo → <b>-o</b>: <b>trabajo</b>.' },
      { type:2, sentence:'¿Tú ___ inglés?', options:['hablas','hablo','habla','hablan'], correct:'hablas', explanation:'tú → <b>-as</b>.' },
      { type:2, sentence:'Mi hermana ___ medicina.', de:'Meine Schwester studiert Medizin.', options:['estudia','estudio','estudias','estudian'], correct:'estudia', explanation:'ella → <b>-a</b>.' },
      { type:2, sentence:'Nosotros ___ a las ocho.', de:'Wir frühstücken um acht.', options:['desayunamos','desayunáis','desayunan','desayuno'], correct:'desayunamos', explanation:'nosotros → <b>-amos</b>.' },
      { type:2, sentence:'Ellos ___ música.', de:'Sie hören Musik.', options:['escuchan','escucháis','escucha','escuchamos'], correct:'escuchan', explanation:'ellos → <b>-an</b>.' },
      { type:1, de:'Wir kaufen Brot.', tiles:['Compramos','pan.','Compran','el'], solution:['Compramos','pan.'], explanation:'<b>comprar</b> → nosotros <b>compramos</b>. Ohne Artikel = unbestimmte Menge.' },
      { type:6, prompt:'Welche Form ist richtig?', options:['vosotros habláis','vosotros hablan','vosotros hablamos','vosotros hablas'], correct:'vosotros habláis', explanation:'vosotros → <b>-áis</b> (mit Akzent).' },
      { type:5, source:'Cocino todos los días.', options:['Ich koche jeden Tag.','Er kocht heute.','Wir kochen manchmal.','Kochst du jeden Tag?'], correct:'Ich koche jeden Tag.', explanation:'<b>cocinar</b> → <b>cocino</b>; <b>todos los días</b> = jeden Tag.' },
      { type:2, sentence:'¿Usted ___ aquí?', de:'Arbeiten Sie hier?', options:['trabaja','trabajas','trabajo','trabajáis'], correct:'trabaja', explanation:'usted → wie él/ella: <b>trabaja</b>.' },
    ],
  },

  {
    id: 8, phase: 2, title: 'Verben auf -er / -ir',
    rule: {
      text: '<b>-er</b> und <b>-ir</b> haben fast dieselben Endungen. Unterschied nur bei <b>nosotros</b> und <b>vosotros</b>: comemos/coméis, aber vivimos/vivís.',
      table: { headers: ['Person', 'comer (essen)', 'vivir (wohnen)'], rows: [['yo', 'como', 'vivo'], ['tú', 'comes', 'vives'], ['él/ella/usted', 'come', 'vive'], ['nosotros', 'comemos', 'vivimos'], ['vosotros', 'coméis', 'vivís'], ['ellos/ustedes', 'comen', 'viven']] },
      examples: [['Vivo en Berlín.', 'Ich wohne in Berlin.'], ['¿Qué bebes?', 'Was trinkst du?']],
    },
    tasks: [
      { type:2, sentence:'Yo ___ en Berlín.', options:['vivo','vives','vive','vivimos'], correct:'vivo', explanation:'yo → <b>-o</b>.' },
      { type:2, sentence:'¿Qué ___ tú? – Agua.', options:['bebes','bebo','bebe','bebéis'], correct:'bebes', explanation:'<b>beber</b>, tú → <b>bebes</b>.' },
      { type:2, sentence:'Nosotros ___ en el centro.', options:['vivimos','vivemos','viven','vivís'], correct:'vivimos', explanation:'-ir, nosotros → <b>-imos</b>.' },
      { type:2, sentence:'Nosotros ___ a las dos.', de:'Wir essen um zwei.', options:['comemos','comimos','comen','coméis'], correct:'comemos', explanation:'-er, nosotros → <b>-emos</b>. (comimos wäre Vergangenheit.)' },
      { type:2, sentence:'Mis padres ___ el periódico.', de:'Meine Eltern lesen die Zeitung.', options:['leen','lee','leemos','leéis'], correct:'leen', explanation:'<b>leer</b>, ellos → <b>leen</b>.' },
      { type:1, de:'Er schreibt einen Brief.', tiles:['Escribe','una','carta.','escribo'], solution:['Escribe','una','carta.'], explanation:'<b>escribir</b>, él → <b>escribe</b>.' },
      { type:6, prompt:'Welche Form ist richtig?', options:['vosotros vivís','vosotros vivéis','vosotros viven','vosotros vivimos'], correct:'vosotros vivís', explanation:'-ir, vosotros → <b>-ís</b>.' },
      { type:5, source:'¿Comprendes?', options:['Verstehst du?','Isst du?','Kaufst du?','Kommst du?'], correct:'Verstehst du?', explanation:'<b>comprender</b> = verstehen.' },
      { type:2, sentence:'¿Dónde ___ ustedes?', de:'Wo wohnen Sie (Plural)?', options:['viven','vive','vivís','vivimos'], correct:'viven', explanation:'ustedes → wie ellos: <b>viven</b>.' },
    ],
  },

  {
    id: 9, phase: 2, title: 'tener – haben',
    rule: {
      text: '<b>tener</b> ist unregelmäßig (yo <b>tengo</b>, e→ie in tú/él/ellos). Mit <b>tener</b> sagt man auch das <b>Alter</b> (<i>Tengo 30 años</i>) und Zustände wie <b>tener hambre/sed/frío</b>. <b>tener que</b> + Infinitiv = müssen.',
      table: { headers: ['Person', 'tener'], rows: [['yo', 'tengo'], ['tú', 'tienes'], ['él/ella/usted', 'tiene'], ['nosotros', 'tenemos'], ['vosotros', 'tenéis'], ['ellos/ustedes', 'tienen']] },
      examples: [['Tengo dos hermanos.', 'Ich habe zwei Geschwister.'], ['¿Cuántos años tienes?', 'Wie alt bist du?'], ['Tengo que trabajar.', 'Ich muss arbeiten.']],
    },
    tasks: [
      { type:2, sentence:'Yo ___ dos hermanos.', options:['tengo','tieno','tienes','tenemos'], correct:'tengo', explanation:'yo → <b>tengo</b> (unregelmäßig).' },
      { type:2, sentence:'¿Cuántos años ___ tú?', options:['tienes','tenes','tiene','eres'], correct:'tienes', explanation:'Alter mit <b>tener</b>: <b>¿Cuántos años tienes?</b>' },
      { type:1, de:'Ich bin 30 Jahre alt.', tiles:['Tengo','30','años.','Soy'], solution:['Tengo','30','años.'], explanation:'Spanisch: „Ich habe 30 Jahre“ – <b>Tengo 30 años</b>.' },
      { type:2, sentence:'Mi abuela ___ 85 años.', options:['tiene','tienen','es','tengo'], correct:'tiene', explanation:'ella → <b>tiene</b>.' },
      { type:2, sentence:'Tengo ___. ¿Hay agua?', de:'Ich habe Durst. Gibt es Wasser?', options:['sed','hambre','frío','sueño'], correct:'sed', explanation:'<b>tener sed</b> = Durst haben; hambre = Hunger, frío = kalt, sueño = müde.' },
      { type:2, sentence:'Mañana ___ que trabajar.', de:'Morgen muss ich arbeiten.', options:['tengo','tienes','debo','hay'], correct:'tengo', explanation:'<b>tener que</b> + Infinitiv = müssen.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Tenemos que estudiar.','Tenemos estudiar.','Tenemos de estudiar.','Somos que estudiar.'], correct:'Tenemos que estudiar.', explanation:'<b>tener que</b> + Infinitiv – das <b>que</b> nicht vergessen.' },
      { type:5, source:'No tengo tiempo.', options:['Ich habe keine Zeit.','Ich habe kein Wetter.','Es ist keine Zeit.','Ich nehme mir Zeit.'], correct:'Ich habe keine Zeit.', explanation:'<b>tiempo</b> = Zeit (auch: Wetter).' },
      { type:2, sentence:'¿Vosotros ___ hijos?', options:['tenéis','tienen','tienes','tenemos'], correct:'tenéis', explanation:'vosotros → <b>tenéis</b> (regelmäßig).' },
    ],
  },

  {
    id: 10, phase: 2, title: 'hay oder está?',
    rule: {
      text: '<b>hay</b> (es gibt) nennt, <b>dass</b> etwas da ist – mit unbestimmtem Artikel, Zahl oder ohne Artikel. <b>estar</b> sagt, <b>wo</b> etwas Bestimmtes ist – mit bestimmtem Artikel oder Namen. <b>hay</b> hat nur diese eine Form (Singular und Plural).',
      table: { headers: ['hay + …', 'estar + Ort'], rows: [['Hay un bar en la plaza.', 'El bar está en la plaza.'], ['Hay dos farmacias.', 'Las farmacias están cerca.'], ['No hay leche.', '¿Dónde está la leche?']] },
      examples: [['¿Hay un banco por aquí?', 'Gibt es hier eine Bank?'], ['El banco está a la derecha.', 'Die Bank ist rechts.']],
    },
    tasks: [
      { type:2, sentence:'En mi calle ___ un supermercado.', options:['hay','está','es','tiene'], correct:'hay', explanation:'unbestimmter Artikel (<b>un</b>) → <b>hay</b>.' },
      { type:2, sentence:'El supermercado ___ al lado del parque.', options:['está','hay','es','tiene'], correct:'está', explanation:'bestimmter Artikel (<b>el</b>) + Ort → <b>estar</b>.' },
      { type:2, sentence:'___ tres hospitales en la ciudad.', options:['Hay','Están','Son','Hayn'], correct:'Hay', explanation:'<b>hay</b> bleibt auch im Plural <b>hay</b>.' },
      { type:2, sentence:'¿Dónde ___ los servicios?', de:'Wo sind die Toiletten?', options:['están','hay','son','está'], correct:'están', explanation:'Ort bestimmter Dinge → <b>estar</b>; Plural → <b>están</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['No hay pan.','No está pan.','No hay el pan.','No es pan.'], correct:'No hay pan.', explanation:'Existenz ohne Artikel → <b>hay</b>. „Das Brot ist nicht da“ (ein bestimmtes) wäre: <b>El pan no está.</b>' },
      { type:1, de:'Gibt es hier eine Apotheke?', tiles:['¿Hay','una','farmacia','por','aquí?','está'], solution:['¿Hay','una','farmacia','por','aquí?'], explanation:'<b>¿Hay … por aquí?</b> – die typische Frage nach etwas in der Nähe.' },
      { type:2, sentence:'Madrid ___ en el centro de España.', options:['está','hay','es','tiene'], correct:'está', explanation:'Lage einer Stadt (Name) → <b>estar</b>.' },
      { type:5, source:'Hay mucha gente.', options:['Es sind viele Leute da.','Die Leute sind hier.','Viele Leute sind nett.','Es gibt wenig Leute.'], correct:'Es sind viele Leute da.', explanation:'<b>hay</b> = es gibt / es sind … da.' },
      { type:2, sentence:'La farmacia ___ cerca.', options:['está','hay','es','son'], correct:'está', explanation:'bestimmt + Ort → <b>está</b>.' },
    ],
  },

  {
    id: 11, phase: 2, title: 'estar – Ort & Befinden',
    rule: {
      text: '<b>estar</b> steht für <b>Ort</b> (<i>Estoy en casa</i>) und <b>Zustand/Befinden</b> (<i>Estoy cansado</i>). <b>ser</b> steht für Identität, Herkunft, Beruf und <b>Eigenschaften</b>. Vergleiche: <i>Es aburrido</i> (er ist langweilig) – <i>Está aburrido</i> (ihm ist langweilig).',
      table: { headers: ['Person', 'estar'], rows: [['yo', 'estoy'], ['tú', 'estás'], ['él/ella/usted', 'está'], ['nosotros', 'estamos'], ['vosotros', 'estáis'], ['ellos/ustedes', 'están']] },
      examples: [['¿Cómo estás? – Estoy bien.', 'Wie geht es dir? – Mir geht es gut.'], ['Estamos en el trabajo.', 'Wir sind auf der Arbeit.'], ['Mi hermano es alto.', 'Mein Bruder ist groß. (Eigenschaft → ser)']],
    },
    tasks: [
      { type:2, sentence:'¿Cómo ___? – Bien, gracias.', options:['estás','eres','tienes','hay'], correct:'estás', explanation:'Befinden → <b>estar</b>: <b>¿Cómo estás?</b>' },
      { type:2, sentence:'Hoy ___ muy cansada.', de:'Heute bin ich sehr müde.', options:['estoy','soy','tengo','hay'], correct:'estoy', explanation:'vorübergehender Zustand → <b>estar</b>.' },
      { type:2, sentence:'Mis padres ___ en Málaga.', options:['están','son','hay','estáis'], correct:'están', explanation:'Ort → <b>estar</b>.' },
      { type:2, sentence:'Ana ___ muy simpática.', options:['es','está','hay','tiene'], correct:'es', explanation:'Charaktereigenschaft → <b>ser</b>.' },
      { type:2, sentence:'La sopa ___ fría.', de:'Die Suppe ist (gerade) kalt.', options:['está','es','hay','tiene'], correct:'está', explanation:'momentaner Zustand → <b>estar</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Estoy en el hospital.','Soy en el hospital.','Hay en el hospital.','Estoy el hospital.'], correct:'Estoy en el hospital.', explanation:'Aufenthaltsort einer Person → <b>estar en</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Mi padre es médico.','Mi padre está médico.','Mi padre está un médico.','Mi padre hay médico.'], correct:'Mi padre es médico.', explanation:'Beruf → <b>ser</b>.' },
      { type:1, de:'Wir sind nervös.', tiles:['Estamos','nerviosos.','Somos'], solution:['Estamos','nerviosos.'], explanation:'Gefühl/Zustand → <b>estar</b>.' },
      { type:5, source:'Está enfermo.', options:['Er ist krank.','Er ist ein Kranker.','Er ist Krankenpfleger.','Er ist im Krankenhaus.'], correct:'Er ist krank.', explanation:'<b>estar enfermo</b> = krank sein (Zustand).' },
      { type:2, sentence:'¿De dónde ___ tú?', options:['eres','estás','hay','vives'], correct:'eres', explanation:'Herkunft → <b>ser de</b>, nicht estar!' },
    ],
  },

  {
    id: 12, phase: 2, title: 'mein, dein, sein…',
    rule: {
      text: 'Possessivbegleiter stehen <b>vor</b> dem Nomen und richten sich nach dem <b>Besitz</b> (Singular/Plural), nicht nach dem Besitzer. <b>su/sus</b> heißt: sein, ihr (Sg.), Ihr, ihr (Pl.). <b>nuestro/vuestro</b> passen sich auch im Genus an.',
      table: { headers: ['', 'Singular', 'Plural'], rows: [['mein', 'mi', 'mis'], ['dein', 'tu', 'tus'], ['sein/ihr/Ihr', 'su', 'sus'], ['unser', 'nuestro/-a', 'nuestros/-as'], ['euer', 'vuestro/-a', 'vuestros/-as']] },
      examples: [['mi hermano / mis hermanos', 'mein Bruder / meine Geschwister'], ['nuestra casa', 'unser Haus']],
    },
    tasks: [
      { type:2, sentence:'___ madre se llama Carmen.', de:'Meine Mutter heißt Carmen.', options:['Mi','Mis','Me','Mía'], correct:'Mi', explanation:'ein Besitz (Singular) → <b>mi</b>.' },
      { type:2, sentence:'___ amigos son muy simpáticos.', de:'Deine Freunde sind sehr nett.', options:['Tus','Tu','Tú','Su'], correct:'Tus', explanation:'Plural → <b>tus</b>. (<b>tú</b> mit Akzent = du.)' },
      { type:2, sentence:'Pedro y ___ mujer viven en Lima.', de:'Pedro und seine Frau…', options:['su','sus','tu','mi'], correct:'su', explanation:'sein/ihr (Singular) → <b>su</b>.' },
      { type:2, sentence:'___ casa es pequeña.', de:'Unser Haus ist klein.', options:['Nuestra','Nuestro','Nuestras','Nosotros'], correct:'Nuestra', explanation:'<b>casa</b> ist feminin → <b>nuestra</b>.' },
      { type:6, prompt:'Welcher Ausdruck ist richtig?', options:['mi hermano','el mi hermano','mío hermano','mis hermano'], correct:'mi hermano', explanation:'Kein Artikel vor dem Possessivbegleiter: <b>mi hermano</b>.' },
      { type:2, sentence:'Señor López, ¿es ___ coche?', de:'Herr López, ist das Ihr Auto?', options:['su','tu','sus','vuestro'], correct:'su', explanation:'Höflichkeitsform (usted) → <b>su</b>.' },
      { type:1, de:'Meine Eltern wohnen in Köln.', tiles:['Mis','padres','viven','en','Colonia.','Mi'], solution:['Mis','padres','viven','en','Colonia.'], explanation:'<b>padres</b> (Plural) → <b>mis</b>.' },
      { type:5, source:'vuestras llaves', options:['eure Schlüssel','unsere Schlüssel','ihre Schlüssel','deine Schlüssel'], correct:'eure Schlüssel', explanation:'<b>vuestro/-a/-os/-as</b> = euer.' },
    ],
  },

  {
    id: 13, phase: 2, title: 'Wiederholung Phase 2',
    rule: {
      text: 'Gemischt: Verben auf -ar/-er/-ir, <b>tener</b>, <b>hay/estar</b>, <b>ser/estar</b>, Possessivbegleiter.',
      examples: [['Vivimos en una casa que está cerca del río.', 'Wir wohnen in einem Haus, das nahe am Fluss liegt.']],
    },
    tasks: [
      { type:2, sentence:'¿Dónde ___ (vivir) vosotros?', options:['vivís','vivéis','viven','vivimos'], correct:'vivís', explanation:'-ir, vosotros → <b>vivís</b>.' },
      { type:2, sentence:'En la clase ___ veinte alumnos.', options:['hay','están','son','tienen'], correct:'hay', explanation:'Anzahl/Existenz → <b>hay</b>.' },
      { type:2, sentence:'Hoy mi hermana ___ triste.', options:['está','es','hay','tiene'], correct:'está', explanation:'Gefühl heute → <b>estar</b>.' },
      { type:2, sentence:'Ellos ___ (trabajar) mucho.', options:['trabajan','trabajen','trabajamos','trabaja'], correct:'trabajan', explanation:'-ar, ellos → <b>-an</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Tengo 25 años.','Soy 25 años.','Estoy 25 años.','Tengo 25 año.'], correct:'Tengo 25 años.', explanation:'Alter mit <b>tener</b> + años.' },
      { type:1, de:'Unsere Kinder sind in der Schule.', tiles:['Nuestros','hijos','están','en','el','colegio.','son'], solution:['Nuestros','hijos','están','en','el','colegio.'], explanation:'<b>nuestros</b> (mask. Pl.) + <b>están</b> (Ort).' },
      { type:5, source:'¿Tienes hambre?', options:['Hast du Hunger?','Bist du hungrig gewesen?','Hast du Durst?','Ist dir kalt?'], correct:'Hast du Hunger?', explanation:'<b>tener hambre</b> = Hunger haben.' },
      { type:2, sentence:'Juan ___ alto y moreno.', options:['es','está','hay','tiene'], correct:'es', explanation:'Aussehen als Eigenschaft → <b>ser</b>.' },
      { type:2, sentence:'¿Usted ___ (comer) carne?', options:['come','comes','comen','como'], correct:'come', explanation:'usted → <b>come</b>.' },
    ],
  },

  /* ════════ PHASE 3 — VORLIEBEN, ZEIT, PLÄNE ════════ */

  {
    id: 14, phase: 3, title: 'gustar – mögen',
    rule: {
      text: '<b>gustar</b> funktioniert „andersherum“: Wörtlich „<i>mir gefällt …</i>“. Die Person steht als Pronomen davor (<b>me, te, le, nos, os, les</b>). Das Verb richtet sich nach dem, was gefällt: <b>gusta</b> + Singular/Infinitiv, <b>gustan</b> + Plural. Nach <b>gustar</b> steht der <b>Artikel</b>: <i>Me gusta el café.</i> Zustimmen: <b>a mí también</b> / <b>a mí tampoco</b>.',
      table: { headers: ['wem?', '+ Singular / Infinitiv', '+ Plural'], rows: [['(a mí) me', 'gusta el café', 'gustan los perros'], ['(a ti) te', 'gusta bailar', 'gustan las fiestas'], ['(a él/ella/usted) le', 'gusta', 'gustan'], ['nos / os / les', 'gusta', 'gustan']] },
      examples: [['Me gusta leer.', 'Ich lese gern.'], ['¿Te gustan las películas?', 'Magst du Filme?'], ['– No me gusta el té. – A mí tampoco.', '– Ich mag keinen Tee. – Ich auch nicht.']],
    },
    tasks: [
      { type:2, sentence:'Me ___ el chocolate.', options:['gusta','gustan','gusto','gustas'], correct:'gusta', explanation:'<b>el chocolate</b> (Singular) → <b>gusta</b>.' },
      { type:2, sentence:'Me ___ los perros.', options:['gustan','gusta','gusto','gustamos'], correct:'gustan', explanation:'<b>los perros</b> (Plural) → <b>gustan</b>.' },
      { type:2, sentence:'¿___ gusta bailar?', de:'Tanzt du gern?', options:['Te','Tú','Me','Le'], correct:'Te', explanation:'dir → <b>te</b>. Infinitiv → <b>gusta</b>.' },
      { type:2, sentence:'A mi madre ___ gustan las flores.', options:['le','la','les','me'], correct:'le', explanation:'ihr (einer Person) → <b>le</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Nos gusta la música.','Nos gusta música.','Nosotros gustamos la música.','Nos gustan la música.'], correct:'Nos gusta la música.', explanation:'Nach <b>gustar</b> steht der bestimmte Artikel: <b>la música</b>.' },
      { type:2, sentence:'– Me gusta el mar. – A mí ___.', de:'– Ich mag das Meer. – Ich auch.', options:['también','tampoco','sí','no'], correct:'también', explanation:'Zustimmung zu einem positiven Satz → <b>también</b>.' },
      { type:2, sentence:'– No me gusta el frío. – A mí ___.', de:'– Ich mag die Kälte nicht. – Ich auch nicht.', options:['tampoco','también','no','nunca'], correct:'tampoco', explanation:'Zustimmung zu einem negativen Satz → <b>tampoco</b>.' },
      { type:1, de:'Ich mag keine Tomaten.', tiles:['No','me','gustan','los','tomates.','gusta'], solution:['No','me','gustan','los','tomates.'], explanation:'<b>no</b> vor dem Pronomen; Plural → <b>gustan</b>.' },
      { type:5, source:'¿Os gusta Madrid?', options:['Gefällt euch Madrid?','Gefällt dir Madrid?','Mögen sie Madrid?','Seid ihr in Madrid?'], correct:'Gefällt euch Madrid?', explanation:'<b>os</b> = euch.' },
    ],
  },

  {
    id: 15, phase: 3, title: 'Uhrzeit & Wochentage',
    rule: {
      text: 'Uhrzeit mit <b>ser</b>: <b>Es la una</b> (1 Uhr, Singular!), sonst <b>Son las dos/tres…</b> Minuten: <b>y</b> (nach), <b>menos</b> (vor), <b>y cuarto</b>, <b>y media</b>, <b>menos cuarto</b>. „Um“ = <b>a las</b>. Wochentage sind maskulin und klein geschrieben: <b>el lunes</b> = am Montag, <b>los lunes</b> = montags.',
      table: { headers: ['Uhrzeit', 'auf Spanisch'], rows: [['13:00', 'Es la una.'], ['15:15', 'Son las tres y cuarto.'], ['16:30', 'Son las cuatro y media.'], ['17:45', 'Son las seis menos cuarto.'], ['um 8 Uhr', 'a las ocho']] },
      examples: [['¿Qué hora es?', 'Wie spät ist es?'], ['El lunes trabajo hasta las cinco.', 'Am Montag arbeite ich bis fünf.']],
    },
    tasks: [
      { type:2, sentence:'___ las tres.', de:'Es ist drei Uhr.', options:['Son','Es','Están','Hay'], correct:'Son', explanation:'Ab zwei Uhr: <b>Son las …</b>' },
      { type:2, sentence:'___ la una y diez.', options:['Es','Son','Está','Hay'], correct:'Es', explanation:'Ein Uhr ist Singular: <b>Es la una</b>.' },
      { type:2, sentence:'Son las cinco y ___. (17:30)', options:['media','cuarto','medio','treinta y'], correct:'media', explanation:'halb → <b>y media</b>.' },
      { type:2, sentence:'Son las nueve ___ cuarto. (8:45)', options:['menos','y','por','de'], correct:'menos', explanation:'Viertel vor → <b>menos cuarto</b>: es fehlt noch eine Viertelstunde bis neun.' },
      { type:2, sentence:'La clase empieza ___ las ocho.', de:'Der Kurs beginnt um acht.', options:['a','en','por','de'], correct:'a', explanation:'um … Uhr → <b>a las</b>.' },
      { type:6, prompt:'Wie sagt man „am Freitag“?', options:['el viernes','en viernes','al viernes','en el viernes'], correct:'el viernes', explanation:'Wochentage mit Artikel, ohne Präposition: <b>el viernes</b> = am Freitag.' },
      { type:5, source:'Los domingos duermo mucho.', options:['Sonntags schlafe ich viel.','Am Sonntag habe ich geschlafen.','Ich schlafe jeden Tag viel.','Sonntags arbeite ich viel.'], correct:'Sonntags schlafe ich viel.', explanation:'<b>los domingos</b> (Plural) = sonntags (immer).' },
      { type:1, de:'Wie spät ist es?', tiles:['¿Qué','hora','es?','son?'], solution:['¿Qué','hora','es?'], explanation:'Feste Frage: <b>¿Qué hora es?</b>' },
      { type:2, sentence:'Trabajo de lunes ___ viernes.', de:'Ich arbeite von Montag bis Freitag.', options:['a','hasta el','en','y'], correct:'a', explanation:'von … bis … (Tage) → <b>de lunes a viernes</b>.' },
    ],
  },

  {
    id: 16, phase: 3, title: 'Verben mit Stammwechsel',
    rule: {
      text: 'Manche Verben ändern den betonten Stammvokal – in allen Formen <b>außer nosotros/vosotros</b> („Stiefel-Verben“). <b>e → ie</b>: querer, preferir, empezar, pensar. <b>o → ue</b>: poder, dormir, volver, costar. <b>u → ue</b>: nur jugar. <b>e → i</b>: pedir, repetir.',
      table: { headers: ['Person', 'querer (e→ie)', 'poder (o→ue)', 'pedir (e→i)'], rows: [['yo', 'quiero', 'puedo', 'pido'], ['tú', 'quieres', 'puedes', 'pides'], ['él/ella', 'quiere', 'puede', 'pide'], ['nosotros', 'queremos', 'podemos', 'pedimos'], ['vosotros', 'queréis', 'podéis', 'pedís'], ['ellos', 'quieren', 'pueden', 'piden']] },
      examples: [['¿Puedes ayudarme?', 'Kannst du mir helfen?'], ['Quiero un café.', 'Ich möchte einen Kaffee.']],
    },
    tasks: [
      { type:2, sentence:'Yo ___ un café, por favor.', options:['quiero','quero','queremos','quieres'], correct:'quiero', explanation:'<b>querer</b> e→ie: <b>quiero</b>.' },
      { type:2, sentence:'¿___ ayudarme?', de:'Kannst du mir helfen?', options:['Puedes','Podes','Pueden','Podéis'], correct:'Puedes', explanation:'<b>poder</b> o→ue: <b>puedes</b>.' },
      { type:2, sentence:'Nosotros ___ ir mañana.', de:'Wir können morgen gehen.', options:['podemos','puedemos','pueden','puedo'], correct:'podemos', explanation:'Bei <b>nosotros</b> kein Stammwechsel: <b>podemos</b>.' },
      { type:2, sentence:'Mi hijo ___ al fútbol.', options:['juega','jugua','juga','jugamos'], correct:'juega', explanation:'<b>jugar</b> u→ue: <b>juega</b>.' },
      { type:2, sentence:'¿Cuánto ___ el billete?', de:'Wie viel kostet die Fahrkarte?', options:['cuesta','costa','cuestan','coste'], correct:'cuesta', explanation:'<b>costar</b> o→ue: <b>cuesta</b> (Singular), <b>cuestan</b> (Plural).' },
      { type:2, sentence:'Los niños ___ mucho.', de:'Die Kinder schlafen viel.', options:['duermen','dormen','dorman','duermimos'], correct:'duermen', explanation:'<b>dormir</b> o→ue: <b>duermen</b>.' },
      { type:6, prompt:'Welche Form ist richtig?', options:['La película empieza a las nueve.','La película empeza a las nueve.','La película empiece a las nueve.','La película empiezan a las nueve.'], correct:'La película empieza a las nueve.', explanation:'<b>empezar</b> e→ie: <b>empieza</b>.' },
      { type:2, sentence:'En el restaurante siempre ___ pescado.', de:'Im Restaurant bestelle ich immer Fisch.', options:['pido','pedo','piedo','pedimos'], correct:'pido', explanation:'<b>pedir</b> e→i: <b>pido</b>.' },
      { type:5, source:'¿Qué prefieres, té o café?', options:['Was ist dir lieber, Tee oder Kaffee?','Möchtest du Tee mit Kaffee?','Trinkst du Tee oder Kaffee?','Wie viel kostet Tee?'], correct:'Was ist dir lieber, Tee oder Kaffee?', explanation:'<b>preferir</b> e→ie: <b>prefieres</b>.' },
    ],
  },

  {
    id: 17, phase: 3, title: 'Reflexive Verben & Tagesablauf',
    rule: {
      text: 'Reflexive Verben haben ein <b>se</b> im Infinitiv (<i>levantarse</i>). Das Reflexivpronomen passt sich der Person an und steht <b>vor</b> dem konjugierten Verb: <b>me, te, se, nos, os, se</b>. Viele sind im Deutschen nicht reflexiv: <i>levantarse</i> = aufstehen.',
      table: { headers: ['Person', 'levantarse (aufstehen)'], rows: [['yo', 'me levanto'], ['tú', 'te levantas'], ['él/ella/usted', 'se levanta'], ['nosotros', 'nos levantamos'], ['vosotros', 'os levantáis'], ['ellos/ustedes', 'se levantan']] },
      examples: [['Me levanto a las seis.', 'Ich stehe um sechs auf.'], ['Nos acostamos tarde.', 'Wir gehen spät ins Bett.'], ['¿Cómo te llamas?', 'Wie heißt du? (llamarse)']],
    },
    tasks: [
      { type:2, sentence:'Yo ___ levanto a las seis.', options:['me','te','se','nos'], correct:'me', explanation:'yo → <b>me</b>.' },
      { type:2, sentence:'¿A qué hora ___ duchas?', options:['te','me','se','os'], correct:'te', explanation:'tú → <b>te</b>.' },
      { type:2, sentence:'Mi padre ___ afeita cada mañana.', options:['se','le','me','lo'], correct:'se', explanation:'él → <b>se</b>.' },
      { type:2, sentence:'Nosotros ___ acostamos tarde.', options:['nos','se','os','me'], correct:'nos', explanation:'nosotros → <b>nos</b>.' },
      { type:1, de:'Ich ziehe mich schnell an.', tiles:['Me','visto','rápido.','Se'], solution:['Me','visto','rápido.'], explanation:'<b>vestirse</b> (e→i): <b>me visto</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Ellos se despiertan temprano.','Ellos despiertan se temprano.','Ellos se despertan temprano.','Ellos les despiertan temprano.'], correct:'Ellos se despiertan temprano.', explanation:'Pronomen vor dem Verb; <b>despertarse</b> e→ie: <b>se despiertan</b>.' },
      { type:5, source:'Me acuesto a las once.', options:['Ich gehe um elf ins Bett.','Ich stehe um elf auf.','Ich dusche um elf.','Ich esse um elf.'], correct:'Ich gehe um elf ins Bett.', explanation:'<b>acostarse</b> (o→ue) = ins Bett gehen.' },
      { type:2, sentence:'¿Vosotros ___ quedáis en casa?', de:'Bleibt ihr zu Hause?', options:['os','nos','se','te'], correct:'os', explanation:'vosotros → <b>os</b>.' },
      { type:2, sentence:'Mis hijos ___ llaman Leo y Mía.', options:['se','les','los','sus'], correct:'se', explanation:'<b>llamarse</b>, ellos → <b>se llaman</b>.' },
    ],
  },

  {
    id: 18, phase: 3, title: 'ir & Pläne: ir a + Infinitiv',
    rule: {
      text: '<b>ir</b> (gehen/fahren) ist unregelmäßig. <b>ir a</b> + Infinitiv drückt Pläne und die nahe Zukunft aus: <i>Voy a estudiar.</i> Richtung: <b>ir a</b> (+ el = <b>al</b>). Dazu passen <b>mañana, el fin de semana, la semana que viene</b>.',
      table: { headers: ['Person', 'ir', 'Plan'], rows: [['yo', 'voy', 'voy a viajar'], ['tú', 'vas', 'vas a comer'], ['él/ella/usted', 'va', 'va a llover'], ['nosotros', 'vamos', 'vamos a salir'], ['vosotros', 'vais', 'vais a ver'], ['ellos/ustedes', 'van', 'van a llegar']] },
      examples: [['Mañana voy a trabajar.', 'Morgen werde ich arbeiten.'], ['Vamos al cine.', 'Wir gehen ins Kino.']],
    },
    tasks: [
      { type:2, sentence:'Yo ___ al trabajo en bici.', options:['voy','vo','vas','va'], correct:'voy', explanation:'<b>ir</b>, yo → <b>voy</b>.' },
      { type:2, sentence:'Mañana vamos ___ visitar a mis abuelos.', options:['a','de','por','—'], correct:'a', explanation:'<b>ir a</b> + Infinitiv – das <b>a</b> ist Pflicht.' },
      { type:2, sentence:'¿Qué ___ a hacer el fin de semana?', de:'Was machst du am Wochenende?', options:['vas','va','voy','vais'], correct:'vas', explanation:'tú → <b>vas</b>.' },
      { type:2, sentence:'Esta noche vamos ___ cine.', options:['al','a el','en el','del'], correct:'al', explanation:'<b>a + el = al</b>.' },
      { type:1, de:'Es wird regnen.', tiles:['Va','a','llover.','Voy'], solution:['Va','a','llover.'], explanation:'Wetter mit 3. Person: <b>Va a llover.</b>' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Ellos van a llegar tarde.','Ellos van llegar tarde.','Ellos van a llegan tarde.','Ellos va a llegar tarde.'], correct:'Ellos van a llegar tarde.', explanation:'<b>ir</b> konjugiert + <b>a</b> + Infinitiv.' },
      { type:5, source:'¿Vais a venir a la fiesta?', options:['Kommt ihr zur Party?','Seid ihr auf der Party gewesen?','Geht ihr von der Party?','Gibt es eine Party?'], correct:'Kommt ihr zur Party?', explanation:'<b>vais a venir</b> = ihr werdet kommen.' },
      { type:2, sentence:'La semana que ___ voy a Valencia.', de:'Nächste Woche fahre ich nach Valencia.', options:['viene','va','pasada','próxima'], correct:'viene', explanation:'<b>la semana que viene</b> = nächste Woche (auch: la próxima semana).' },
      { type:2, sentence:'Nosotros ___ a la playa.', options:['vamos','vais','van','vemos'], correct:'vamos', explanation:'nosotros → <b>vamos</b>.' },
    ],
  },

  {
    id: 19, phase: 3, title: 'este/ese & Präpositionen',
    rule: {
      text: 'Demonstrativa: <b>este/esta</b> (dieser hier, nah), <b>ese/esa</b> (der da, etwas weiter), <b>aquel/aquella</b> (jener dort). Neutrum für Unbekanntes: <b>esto, eso</b>. Präpositionen: <b>a + el = al</b>, <b>de + el = del</b>; <b>en</b> (in/auf), <b>con</b> (mit), <b>para</b> + Infinitiv (um zu).',
      table: { headers: ['', 'mask. Sg.', 'fem. Sg.', 'mask. Pl.', 'fem. Pl.'], rows: [['hier', 'este', 'esta', 'estos', 'estas'], ['da', 'ese', 'esa', 'esos', 'esas'], ['dort', 'aquel', 'aquella', 'aquellos', 'aquellas']] },
      examples: [['¿Cuánto cuesta esta camiseta?', 'Wie viel kostet dieses T-Shirt?'], ['Vengo del trabajo.', 'Ich komme von der Arbeit.']],
    },
    tasks: [
      { type:2, sentence:'¿Cuánto cuesta ___ chaqueta?', de:'Wie viel kostet diese Jacke (hier)?', options:['esta','este','esto','estas'], correct:'esta', explanation:'<b>chaqueta</b> feminin, nah → <b>esta</b>.' },
      { type:2, sentence:'___ zapatos son caros.', de:'Diese Schuhe (hier) sind teuer.', options:['Estos','Estas','Este','Esos'], correct:'Estos', explanation:'maskulin Plural, nah → <b>estos</b>.' },
      { type:2, sentence:'¿Qué es ___?', de:'Was ist das? (unbekannter Gegenstand)', options:['esto','este','esta','estos'], correct:'esto', explanation:'Neutrum für Unbekanntes → <b>esto/eso</b>.' },
      { type:2, sentence:'Vengo ___ médico.', de:'Ich komme vom Arzt.', options:['del','de el','al','de'], correct:'del', explanation:'<b>de + el = del</b>.' },
      { type:2, sentence:'Voy ___ supermercado.', options:['al','a el','del','en el'], correct:'al', explanation:'<b>a + el = al</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Estudio español para viajar.','Estudio español por viajar.','Estudio español a viajar.','Estudio español para viajo.'], correct:'Estudio español para viajar.', explanation:'Zweck: <b>para</b> + Infinitiv = um zu.' },
      { type:2, sentence:'Vivo ___ Múnich.', options:['en','a','de','por'], correct:'en', explanation:'wohnen in → <b>en</b>.' },
      { type:5, source:'Ese coche es de mi vecino.', options:['Das Auto da gehört meinem Nachbarn.','Dieses Auto ist mein Nachbar.','Jenes Auto ist neu.','Mein Nachbar hat kein Auto.'], correct:'Das Auto da gehört meinem Nachbarn.', explanation:'<b>ser de</b> + Person = gehören.' },
      { type:1, de:'Ich gehe mit meiner Schwester.', tiles:['Voy','con','mi','hermana.','de'], solution:['Voy','con','mi','hermana.'], explanation:'mit → <b>con</b>.' },
    ],
  },

  {
    id: 20, phase: 3, title: 'Abschluss A1',
    rule: {
      text: 'Großer Mix aus allen A1-Themen. Wenn du dieses Level sicher bestehst, beherrschst du die Grundgrammatik für einfache Alltagsgespräche.',
      examples: [['Me llamo Paul, soy alemán y trabajo en un hospital. Los fines de semana me gusta leer y voy a aprender español.', 'Ich heiße Paul, bin Deutscher und arbeite in einem Krankenhaus. Am Wochenende lese ich gern und ich werde Spanisch lernen.']],
    },
    tasks: [
      { type:2, sentence:'Mi hermano ___ enfermero y ___ en Madrid.', options:['es / vive','está / vive','es / viva','tiene / vive'], correct:'es / vive', explanation:'Beruf → <b>ser</b>; <b>vivir</b>, él → <b>vive</b>.' },
      { type:2, sentence:'A nosotros nos ___ las vacaciones.', options:['gustan','gusta','gustamos','gustáis'], correct:'gustan', explanation:'<b>las vacaciones</b> (Plural) → <b>gustan</b>.' },
      { type:2, sentence:'¿___ un hotel cerca de la estación?', options:['Hay','Está','Es','Tiene'], correct:'Hay', explanation:'unbestimmt → <b>hay</b>.' },
      { type:2, sentence:'Hoy no ___ salir, estoy enferma.', de:'Heute kann ich nicht ausgehen…', options:['puedo','podo','puede','podemos'], correct:'puedo', explanation:'<b>poder</b> o→ue: <b>puedo</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Son las diez y media.','Es las diez y media.','Son las diez y medio.','Están las diez y media.'], correct:'Son las diez y media.', explanation:'<b>Son las</b> + Stunde (ab 2) + <b>y media</b>.' },
      { type:1, de:'Morgen werde ich früh aufstehen.', tiles:['Mañana','me','voy','a','levantar','temprano.','se'], solution:['Mañana','me','voy','a','levantar','temprano.'], explanation:'Pronomen vor das konjugierte Verb: <b>me voy a levantar</b> (oder: voy a levantarme).' },
      { type:2, sentence:'___ libros de la mesa son míos.', de:'Die Bücher da auf dem Tisch…', options:['Esos','Esas','Ese','Eso'], correct:'Esos', explanation:'<b>libros</b> mask. Pl., „da“ → <b>esos</b>.' },
      { type:5, source:'Tenemos que comprar pan.', options:['Wir müssen Brot kaufen.','Wir haben Brot gekauft.','Wir möchten Brot kaufen.','Wir haben kein Brot.'], correct:'Wir müssen Brot kaufen.', explanation:'<b>tener que</b> + Infinitiv = müssen.' },
      { type:2, sentence:'¿Dónde ___ tus llaves? – En la mesa.', options:['están','hay','son','está'], correct:'están', explanation:'Ort bestimmter Dinge → <b>estar</b>.' },
      { type:2, sentence:'Los sábados mis amigos y yo ___ al fútbol.', options:['jugamos','juegamos','juegan','jugáis'], correct:'jugamos', explanation:'nosotros (mis amigos y yo) – kein Stammwechsel: <b>jugamos</b>.' },
    ],
  },

  /* ════════ PHASE 4 — AUSBLICK A2: VERGANGENHEIT ════════ */

  {
    id: 21, phase: 4, title: 'Perfekt: he hablado',
    rule: {
      text: 'Das <b>pretérito perfecto</b> bildest du mit <b>haber</b> + Partizip: <b>-ar → -ado</b>, <b>-er/-ir → -ido</b>. Es steht für Vergangenes in einem Zeitraum, der noch andauert: <b>hoy, esta semana, este año, ya, todavía no, nunca</b>. Das Partizip bleibt immer gleich, und nichts steht zwischen haber und Partizip.',
      table: { headers: ['Person', 'haber', 'Beispiel'], rows: [['yo', 'he', 'he trabajado'], ['tú', 'has', 'has comido'], ['él/ella/usted', 'ha', 'ha vivido'], ['nosotros', 'hemos', 'hemos salido'], ['vosotros', 'habéis', 'habéis bebido'], ['ellos/ustedes', 'han', 'han llegado']] },
      examples: [['Hoy he trabajado mucho.', 'Heute habe ich viel gearbeitet.'], ['¿Ya has comido?', 'Hast du schon gegessen?'], ['Unregelmäßig: hecho, visto, escrito, dicho, puesto, vuelto, abierto', 'gemacht, gesehen, geschrieben, gesagt, gestellt, zurückgekehrt, geöffnet']],
    },
    tasks: [
      { type:2, sentence:'Hoy ___ trabajado mucho.', options:['he','ha','has','hemos'], correct:'he', explanation:'yo → <b>he</b> + Partizip.' },
      { type:2, sentence:'¿Ya has ___ (comer)?', options:['comido','comado','comida','comiendo'], correct:'comido', explanation:'-er → <b>-ido</b>: comido.' },
      { type:2, sentence:'Esta semana hemos ___ (hablar) con el jefe.', options:['hablado','hablido','hablada','hablando'], correct:'hablado', explanation:'-ar → <b>-ado</b>: hablado.' },
      { type:2, sentence:'¿Qué has ___ (hacer) hoy?', options:['hecho','hacido','hizo','haciendo'], correct:'hecho', explanation:'unregelmäßig: <b>hacer → hecho</b>.' },
      { type:2, sentence:'Nunca he ___ (ver) el mar.', options:['visto','vido','veído','vista'], correct:'visto', explanation:'unregelmäßig: <b>ver → visto</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Todavía no he terminado.','Todavía he no terminado.','Todavía no he terminada.','Todavía no ha terminado yo.'], correct:'Todavía no he terminado.', explanation:'<b>no</b> vor haber; nichts zwischen <b>he</b> und Partizip.' },
      { type:1, de:'Sie haben den Brief geschrieben.', tiles:['Han','escrito','la','carta.','escribido'], solution:['Han','escrito','la','carta.'], explanation:'unregelmäßig: <b>escribir → escrito</b>.' },
      { type:5, source:'¿Habéis estado en Cuba?', options:['Wart ihr schon mal in Kuba?','Seid ihr in Kuba?','Fahrt ihr nach Kuba?','Wollt ihr nach Kuba?'], correct:'Wart ihr schon mal in Kuba?', explanation:'Erfahrung → Perfekt: <b>habéis estado</b>.' },
    ],
  },

  {
    id: 22, phase: 4, title: 'Indefinido: regelmäßig',
    rule: {
      text: 'Das <b>pretérito indefinido</b> erzählt <b>abgeschlossene</b> Handlungen zu einem vergangenen Zeitpunkt: <b>ayer, anoche, el año pasado, en 2020</b>. Achte auf die Akzente in yo und él (<i>hablé, habló</i>).',
      table: { headers: ['Person', 'hablar', 'comer / vivir'], rows: [['yo', 'hablé', 'comí / viví'], ['tú', 'hablaste', 'comiste / viviste'], ['él/ella/usted', 'habló', 'comió / vivió'], ['nosotros', 'hablamos', 'comimos / vivimos'], ['vosotros', 'hablasteis', 'comisteis / vivisteis'], ['ellos/ustedes', 'hablaron', 'comieron / vivieron']] },
      examples: [['Ayer trabajé hasta las ocho.', 'Gestern habe ich bis acht gearbeitet.'], ['El año pasado vivimos en Sevilla.', 'Letztes Jahr wohnten wir in Sevilla.']],
    },
    tasks: [
      { type:2, sentence:'Ayer ___ (trabajar) hasta tarde.', de:'Gestern habe ich bis spät gearbeitet.', options:['trabajé','trabajo','trabajó','he trabajado'], correct:'trabajé', explanation:'ayer → Indefinido; yo → <b>-é</b>.' },
      { type:2, sentence:'¿Qué ___ (comer) tú anoche?', options:['comiste','comistes','comió','comías'], correct:'comiste', explanation:'tú → <b>-iste</b> (ohne s am Ende!).' },
      { type:2, sentence:'Mi abuelo ___ (nacer) en 1940.', options:['nació','nacó','nacía','ha nacido'], correct:'nació', explanation:'él, -er → <b>-ió</b>.' },
      { type:2, sentence:'El verano pasado ___ (viajar, nosotros) a Perú.', options:['viajamos','viajemos','viajaron','viajábamos'], correct:'viajamos', explanation:'-ar, nosotros: Indefinido = Präsens-Form → <b>viajamos</b>.' },
      { type:2, sentence:'Ellos ___ (llegar) a las diez.', options:['llegaron','llegaban','llegaste','llegamos'], correct:'llegaron', explanation:'ellos → <b>-aron</b>.' },
      { type:6, prompt:'Welcher Satz passt zur Zeitangabe?', options:['Ayer hablé con Marta.','Ayer he hablado con Marta.','Ayer hablo con Marta.','Ayer hablaré con Marta.'], correct:'Ayer hablé con Marta.', explanation:'<b>ayer</b> → Indefinido (in Spanien). Perfekt passt zu <b>hoy/esta semana</b>.' },
      { type:5, source:'Vivieron diez años en Chile.', options:['Sie lebten zehn Jahre in Chile.','Sie leben seit zehn Jahren in Chile.','Sie werden zehn Jahre in Chile leben.','Er lebte zehn Jahre in Chile.'], correct:'Sie lebten zehn Jahre in Chile.', explanation:'abgeschlossener Zeitraum → <b>vivieron</b>.' },
      { type:1, de:'Ich habe ihr ein Buch gekauft.', tiles:['Le','compré','un','libro.','compró'], solution:['Le','compré','un','libro.'], explanation:'yo → <b>compré</b>; <b>le</b> = ihr/ihm.' },
    ],
  },

  {
    id: 23, phase: 4, title: 'Indefinido: ir, ser, tener, hacer',
    rule: {
      text: 'Wichtige unregelmäßige Formen. <b>ir</b> und <b>ser</b> sind im Indefinido <b>identisch</b> – der Kontext entscheidet (<i>Fui a Madrid</i> = ich fuhr; <i>Fue fantástico</i> = es war). Unregelmäßige Stämme haben <b>keine Akzente</b>: tuve, hice, estuve.',
      table: { headers: ['Person', 'ir / ser', 'tener', 'hacer', 'estar'], rows: [['yo', 'fui', 'tuve', 'hice', 'estuve'], ['tú', 'fuiste', 'tuviste', 'hiciste', 'estuviste'], ['él/ella', 'fue', 'tuvo', 'hizo', 'estuvo'], ['nosotros', 'fuimos', 'tuvimos', 'hicimos', 'estuvimos'], ['vosotros', 'fuisteis', 'tuvisteis', 'hicisteis', 'estuvisteis'], ['ellos', 'fueron', 'tuvieron', 'hicieron', 'estuvieron']] },
      examples: [['El sábado fuimos a la playa.', 'Am Samstag fuhren wir an den Strand.'], ['La fiesta fue genial.', 'Die Party war super.'], ['¿Qué hiciste ayer?', 'Was hast du gestern gemacht?']],
    },
    tasks: [
      { type:2, sentence:'El sábado ___ (ir, yo) al cine.', options:['fui','fue','iba','he ido'], correct:'fui', explanation:'<b>ir</b>, yo → <b>fui</b>.' },
      { type:2, sentence:'La película ___ (ser) muy buena.', options:['fue','fui','era','estuvo'], correct:'fue', explanation:'<b>ser</b>, 3. Person → <b>fue</b> (gleich wie ir).' },
      { type:2, sentence:'¿Qué ___ (hacer) tú ayer?', options:['hiciste','haciste','hizo','hacías'], correct:'hiciste', explanation:'<b>hacer</b>, tú → <b>hiciste</b>.' },
      { type:2, sentence:'Mi hermana ___ (hacer) una tarta.', options:['hizo','hició','hice','hació'], correct:'hizo', explanation:'<b>hacer</b>, él/ella → <b>hizo</b> (mit z!).' },
      { type:2, sentence:'Anoche ___ (tener, nosotros) un problema.', options:['tuvimos','tenimos','tuvieron','teníamos'], correct:'tuvimos', explanation:'<b>tener</b> → Stamm <b>tuv-</b>: tuvimos.' },
      { type:2, sentence:'Ayer ___ (estar, ellos) en casa todo el día.', options:['estuvieron','estaron','estuvimos','estaban'], correct:'estuvieron', explanation:'<b>estar</b> → Stamm <b>estuv-</b>: estuvieron.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Tuve que trabajar el domingo.','Tuvé que trabajar el domingo.','Tení que trabajar el domingo.','Tuve trabajar el domingo.'], correct:'Tuve que trabajar el domingo.', explanation:'<b>tuve</b> ohne Akzent; <b>tener que</b> + Infinitiv.' },
      { type:5, source:'¿Adónde fuisteis de vacaciones?', options:['Wohin seid ihr in den Urlaub gefahren?','Wo seid ihr im Urlaub?','Wann fahrt ihr in den Urlaub?','Wie war euer Urlaub?'], correct:'Wohin seid ihr in den Urlaub gefahren?', explanation:'<b>fuisteis</b> = ihr seid gefahren (ir).' },
    ],
  },

  {
    id: 24, phase: 4, title: 'Wiederholung: Vergangenheit',
    rule: {
      text: '<b>Perfekt</b> (he comido): Zeitraum dauert noch an – hoy, esta semana, ya, nunca, alguna vez. <b>Indefinido</b> (comí): abgeschlossen – ayer, anoche, el lunes pasado, en 2019. (In Lateinamerika wird oft auch bei „hoy“ das Indefinido benutzt.)',
      examples: [['Esta mañana he desayunado fruta, pero ayer desayuné churros.', 'Heute Morgen habe ich Obst gefrühstückt, aber gestern Churros.']],
    },
    tasks: [
      { type:2, sentence:'Esta semana ___ mucho.', de:'Diese Woche habe ich viel gelernt.', options:['he estudiado','estudié','estudio','estudiaba'], correct:'he estudiado', explanation:'<b>esta semana</b> → Perfekt.' },
      { type:2, sentence:'El año pasado ___ a Argentina.', options:['fuimos','hemos ido','vamos','íbamos'], correct:'fuimos', explanation:'<b>el año pasado</b> → Indefinido: <b>fuimos</b>.' },
      { type:2, sentence:'¿Alguna vez ___ paella?', de:'Hast du schon mal Paella gegessen?', options:['has comido','comiste','comes','comías'], correct:'has comido', explanation:'Lebenserfahrung (<b>alguna vez</b>) → Perfekt.' },
      { type:2, sentence:'Ayer mis padres ___ en casa.', options:['estuvieron','han estado','están','estaron'], correct:'estuvieron', explanation:'<b>ayer</b> → Indefinido: <b>estuvieron</b>.' },
      { type:6, prompt:'Welcher Satz ist richtig?', options:['Hoy he visto a Carlos.','Hoy he vido a Carlos.','Hoy vi a Carlos ayer.','Hoy ha visto yo a Carlos.'], correct:'Hoy he visto a Carlos.', explanation:'<b>hoy</b> + Perfekt; <b>ver → visto</b>; Personen als Objekt mit <b>a</b>.' },
      { type:2, sentence:'En 2015 ___ (terminar, yo) la carrera.', options:['terminé','he terminado','termino','terminó'], correct:'terminé', explanation:'Jahreszahl → Indefinido: <b>terminé</b>.' },
      { type:5, source:'Todavía no he leído el libro.', options:['Ich habe das Buch noch nicht gelesen.','Ich lese das Buch gerade.','Ich habe das Buch gestern gelesen.','Ich werde das Buch nicht lesen.'], correct:'Ich habe das Buch noch nicht gelesen.', explanation:'<b>todavía no</b> + Perfekt = noch nicht.' },
      { type:1, de:'Was hast du heute gemacht?', tiles:['¿Qué','has','hecho','hoy?','hiciste'], solution:['¿Qué','has','hecho','hoy?'], explanation:'<b>hoy</b> → Perfekt: <b>has hecho</b>.' },
    ],
  },
];
