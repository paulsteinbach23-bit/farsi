/**
 * grammar-data.js
 * Full Farsi grammar content for the beginner app.
 *
 * HOW TO USE IN index.html:
 *   1. Add <script src="grammar-data.js"></script> in the <head> (before index.html's own <script>)
 *   2. Delete or comment out the existing const GRAMMAR = [...] in index.html
 *   3. The renderer uses GRAMMAR_DATA.sections — update buildGrammar() accordingly:
 *
 *      function buildGrammar() {
 *        const el = document.getElementById('grammar-content');
 *        el.innerHTML = GRAMMAR_DATA.sections.map(section => renderSection(section)).join('');
 *      }
 *
 * STRUCTURE:
 *   GRAMMAR_DATA.sections[]
 *     .id          — unique key for linking exercises to rules
 *     .title       — displayed heading
 *     .intro       — short explanation paragraph (shown before subsections)
 *     .subsections[]
 *       .title     — subsection heading
 *       .rule      — explanation text
 *       .tables[]  — optional: { headers[], rows[][] }
 *       .examples[]— { romanized, german }
 *       .note      — optional: highlighted callout text
 */

const GRAMMAR_DATA = {

  meta: {
    language: "Farsi / Persian",
    script_note: "All content uses romanized Persian (no Persian script). â = long open A, kh = like Bach, gh = voiced guttural.",
    target_audience: "German native speakers",
    last_updated: "2026"
  },

  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — VERB CONJUGATION
    ───────────────────────────────────────────── */
    {
      id: "verb_conjugation",
      title: "1. Verbkonjugation",
      intro: "Jedes persische Verb hat zwei Stämme: den Vergangenheitsstamm und den Präsensstamm. Alle Zeitformen werden aus diesen zwei Stämmen plus persönlichen Endungen gebaut.",

      subsections: [

        {
          id: "verb_stems",
          title: "1.1 Die zwei Stämme",
          rule: "Der Vergangenheitsstamm entsteht durch Abschneiden der Infinitivendung -an. Der Präsensstamm muss bei unregelmäßigen Verben auswendig gelernt werden.",
          tables: [
            {
              headers: ["Begriff", "Funktion", "Beispiel"],
              rows: [
                ["Vergangenheitsstamm (bon-e mâzi)", "Basis für alle Vergangenheitsformen", "raft-an → raft"],
                ["Präsensstamm (bon-e mozâre)", "Basis für Gegenwart, Imperativ, Konjunktiv", "raftan → rav"]
              ]
            }
          ],
          examples: [
            { romanized: "raft-an → raft", german: "gehen → Vergangenheitsstamm" },
            { romanized: "khând-an → khând", german: "lesen → Vergangenheitsstamm" },
            { romanized: "kard-an → kard", german: "tun → Vergangenheitsstamm" }
          ]
        },

        {
          id: "personal_endings",
          title: "1.2 Persönliche Endungen",
          rule: "Diese Endungen hängen an beide Stämme und sind für alle Zeiten gleich. Die 3. Person Singular Vergangenheit bekommt keine Endung — der Stamm steht allein.",
          tables: [
            {
              headers: ["Person", "Singular", "Plural"],
              rows: [
                ["1. (ich / wir)", "-am", "-im"],
                ["2. (du / ihr)", "-i", "-id"],
                ["3. (er·sie·es / sie)", "-ad (Präsens) / Ø (Vergangenheit)", "-and"]
              ]
            }
          ],
          examples: []
        },

        {
          id: "present_tense",
          title: "1.3 Präsens (Gegenwart)",
          rule: "Bildung: Präfix mi- + Präsensstamm + persönliche Endung.",
          tables: [
            {
              caption: "raftan (gehen) — Präsensstamm: rav",
              headers: ["Person", "Romanisiert", "Deutsch"],
              rows: [
                ["man", "mi-rav-am", "ich gehe"],
                ["to", "mi-rav-i", "du gehst"],
                ["u", "mi-rav-ad", "er·sie geht"],
                ["mâ", "mi-rav-im", "wir gehen"],
                ["shomâ", "mi-rav-id", "ihr geht / Sie gehen"],
                ["ânhâ", "mi-rav-and", "sie gehen"]
              ]
            },
            {
              caption: "khândan (lesen) — Präsensstamm: khân",
              headers: ["Person", "Romanisiert", "Deutsch"],
              rows: [
                ["man", "mi-khân-am", "ich lese"],
                ["to", "mi-khân-i", "du liest"],
                ["u", "mi-khân-ad", "er·sie liest"],
                ["mâ", "mi-khân-im", "wir lesen"],
                ["shomâ", "mi-khân-id", "ihr lest"],
                ["ânhâ", "mi-khân-and", "sie lesen"]
              ]
            }
          ],
          examples: []
        },

        {
          id: "past_tense",
          title: "1.4 Einfache Vergangenheit",
          rule: "Bildung: Vergangenheitsstamm + persönliche Endung. Kein mi-Präfix. 3. Person Singular = bloßer Stamm ohne Endung.",
          tables: [
            {
              caption: "raftan (gehen) — Vergangenheitsstamm: raft",
              headers: ["Person", "Romanisiert", "Deutsch"],
              rows: [
                ["man", "raft-am", "ich ging"],
                ["to", "raft-i", "du gingst"],
                ["u", "raft", "er·sie ging"],
                ["mâ", "raft-im", "wir gingen"],
                ["shomâ", "raft-id", "ihr gingt"],
                ["ânhâ", "raft-and", "sie gingen"]
              ]
            },
            {
              caption: "didan (sehen) — Vergangenheitsstamm: did",
              headers: ["Person", "Romanisiert", "Deutsch"],
              rows: [
                ["man", "did-am", "ich sah"],
                ["to", "did-i", "du sahst"],
                ["u", "did", "er·sie sah"],
                ["mâ", "did-im", "wir sahen"],
                ["shomâ", "did-id", "ihr saht"],
                ["ânhâ", "did-and", "sie sahen"]
              ]
            }
          ],
          examples: []
        },

        {
          id: "negation",
          title: "1.5 Verneinung",
          rule: "Gegenwart: mi- wird durch nemi- ersetzt. Vergangenheit: Präfix na- vor den Stamm.",
          examples: [
            { romanized: "miravam → nemiravam", german: "ich gehe → ich gehe nicht" },
            { romanized: "mikonam → nemikonam", german: "ich tue → ich tue nicht" },
            { romanized: "raftam → naraftam", german: "ich ging → ich ging nicht" },
            { romanized: "didam → nadidam", german: "ich sah → ich sah nicht" }
          ],
          note: "Verneinung von budan (sein): nistam, nisti, nist, nistim, nistid, nistand"
        },

        {
          id: "verb_budan",
          title: "1.6 Das Verb sein — budan (hochgradig unregelmäßig)",
          rule: "budan hat zwei Präsensformen: die vollständige hast-Form und eine kurze Suffixform, die direkt an das Prädikat angehängt wird. Letzteres ist wie wenn im Deutschen das Sein-Verb mit dem Adjektiv verschmilzt.",
          tables: [
            {
              caption: "Form A — hast- (vollständig, betont)",
              headers: ["Person", "Romanisiert", "Deutsch"],
              rows: [
                ["man", "hast-am", "ich bin"],
                ["to", "hast-i", "du bist"],
                ["u", "hast / ast", "er·sie ist"],
                ["mâ", "hast-im", "wir sind"],
                ["shomâ", "hast-id", "ihr seid"],
                ["ânhâ", "hast-and", "sie sind"]
              ]
            },
            {
              caption: "Form B — Kurzsuffix am Prädikat",
              headers: ["Person", "Suffix", "Beispiel", "Deutsch"],
              rows: [
                ["man", "-am", "khub-am", "ich bin gut"],
                ["to", "-i", "khub-i", "du bist gut"],
                ["u", "-e / -ast", "khub-e / khub ast", "er·sie ist gut"],
                ["mâ", "-im", "khub-im", "wir sind gut"],
                ["shomâ", "-id", "khub-id", "ihr seid gut"],
                ["ânhâ", "-and", "khub-and", "sie sind gut"]
              ]
            },
            {
              caption: "Vergangenheit von budan",
              headers: ["Person", "Romanisiert", "Deutsch"],
              rows: [
                ["man", "bud-am", "ich war"],
                ["to", "bud-i", "du warst"],
                ["u", "bud", "er·sie war"],
                ["mâ", "bud-im", "wir waren"],
                ["shomâ", "bud-id", "ihr wart"],
                ["ânhâ", "bud-and", "sie waren"]
              ]
            }
          ],
          examples: []
        },

        {
          id: "verb_dashtan",
          title: "1.7 Das Verb haben — dâshtan (kein mi-!)",
          rule: "dâshtan nimmt im Präsens kein mi-Präfix — es ist das einzige häufige Verb mit dieser Eigenschaft. Präsensstamm: dâr.",
          tables: [
            {
              headers: ["Person", "Präsens", "Vergangenheit"],
              rows: [
                ["man", "dâr-am", "dâsht-am"],
                ["to", "dâr-i", "dâsht-i"],
                ["u", "dâr-ad", "dâsht"],
                ["mâ", "dâr-im", "dâsht-im"],
                ["shomâ", "dâr-id", "dâsht-id"],
                ["ânhâ", "dâr-and", "dâsht-and"]
              ]
            }
          ],
          examples: []
        },

        {
          id: "irregular_verbs",
          title: "1.8 Unregelmäßige Verben — vollständige Liste",
          rule: "Bei diesen Verben kann der Präsensstamm nicht aus dem Infinitiv abgeleitet werden. Er muss auswendig gelernt werden. Zusätzliche Regel: Endet ein Präsensstamm auf einen Vokal, wird vor den persönlichen Endungen ein -y- als Gleitlaut eingefügt.",
          tables: [
            {
              headers: ["Infinitiv", "Bedeutung (DE)", "Vergangenheitsstamm", "Präsensstamm"],
              rows: [
                ["raftan", "gehen", "raft", "rav"],
                ["âmadan", "kommen", "âmad", "â(y)"],
                ["didan", "sehen", "did", "bin"],
                ["kardan", "tun / machen", "kard", "kon"],
                ["goftan", "sagen", "goft", "gu"],
                ["dânestan", "wissen", "dânest", "dân"],
                ["khândan", "lesen / singen", "khând", "khân"],
                ["neveshtan", "schreiben", "nevesht", "nevis"],
                ["khordan", "essen / trinken", "khord", "khor"],
                ["dâdan", "geben", "dâd", "deh"],
                ["gereftan", "nehmen", "gereft", "gir"],
                ["bordan", "tragen / bringen", "bord", "bar"],
                ["âvordan", "mitbringen", "âvord", "âvar"],
                ["shodan", "werden", "shod", "shav"],
                ["budan", "sein", "bud", "bâsh"],
                ["dâshtan", "haben", "dâsht", "dâr"],
                ["zadan", "schlagen / spielen", "zad", "zan"],
                ["keshidan", "ziehen / zeichnen", "keshid", "kesh"],
                ["residan", "ankommen", "resid", "res"],
                ["neshestan", "sitzen", "neshast", "neshin"],
                ["khâstan", "wollen", "khâst", "khâh"],
                ["tavânestan", "können", "tavânest", "tavân"],
                ["oftâdan", "fallen", "oftâd", "oft"],
                ["gozâshtan", "legen / lassen", "gozâsht", "gozâr"],
                ["forkhtan", "verkaufen", "fokht", "forush"]
              ]
            }
          ],
          examples: [
            { romanized: "mi-deh-am / dâd-am", german: "dâdan: ich gebe / ich gab" },
            { romanized: "mi-gu-yam / goft-am", german: "goftan: ich sage / ich sagte" },
            { romanized: "mi-yâ-m / âmad-am", german: "âmadan: ich komme / ich kam" },
            { romanized: "mi-kon-am / kard-am", german: "kardan: ich mache / ich machte" },
            { romanized: "mi-gir-am / gereft-am", german: "gereftan: ich nehme / ich nahm" }
          ]
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — PLURAL
    ───────────────────────────────────────────── */
    {
      id: "plural",
      title: "2. Pluralbildung von Substantiven",
      intro: "Persisch hat zwei reguläre Pluralendungen: -hâ (universell, umgangssprachlich) und -ân (formell, hauptsächlich für belebte Nomen). Im Alltag dominiert -hâ fast vollständig.",

      subsections: [

        {
          id: "plural_suffixes",
          title: "2.1 Die zwei Standardendungen",
          rule: "A) -hâ: universell, kolloquial, mit allem verwendbar. B) -ân: formell, hauptsächlich für Personen und Tiere.",
          tables: [
            {
              headers: ["Endung", "Verwendung", "Beispiele"],
              rows: [
                ["-hâ", "universell, kolloquial", "ketâb-hâ, miz-hâ, doktor-hâ, shahr-hâ"],
                ["-ân", "formell, belebt", "doktor-ân, ostâd-ân, mard-ân, dust-ân"]
              ]
            }
          ],
          examples: [
            { romanized: "ketâb → ketâb-hâ", german: "Buch → Bücher" },
            { romanized: "doktor → doktor-hâ / doktor-ân", german: "Arzt → Ärzte (umg. / formell)" },
            { romanized: "dâneshju → dâneshju-yân", german: "Student → Studenten (y-Gleitlaut nach Vokal)" }
          ],
          note: "Im Alltag ist -hâ immer korrekt. -ân klingt schriftsprachlich und gehoben."
        },

        {
          id: "plural_glide",
          title: "2.2 Phonologische Anpassungen bei Vokalendungen",
          rule: "Bei Wörtern, die auf einen Vokal enden, wird vor -ân ein y-Gleitlaut eingefügt.",
          tables: [
            {
              headers: ["Wortendung", "Plural mit -hâ", "Plural mit -ân"],
              rows: [
                ["Konsonant", "ketâb → ketâb-hâ", "ostâd → ostâd-ân"],
                ["Vokal -u", "bâzu → bâzu-hâ", "dâneshju → dâneshju-yân"],
                ["Vokal -i", "tâksi → tâksi-hâ", "—"],
                ["Vokal -â", "âqâ → âqâ-hâ", "âqâ → âqâ-yân"],
                ["stummes -e", "khâne → khâne-hâ", "—"]
              ]
            }
          ],
          examples: []
        },

        {
          id: "plural_arabic",
          title: "2.3 Arabische Lehnwörter — gebrochene Plurale",
          rule: "Viele persische Wörter stammen aus dem Arabischen und haben im Arabischen einen gebrochenen Plural (innere Vokalveränderung). Diese Formen kommen in Zeitungen und Schriftsprache vor. Im Gespräch ist -hâ immer akzeptabel.",
          tables: [
            {
              headers: ["Singular", "Bedeutung", "Arabischer Plural", "Umgangssprache"],
              rows: [
                ["ketâb", "Buch", "kotob", "ketâb-hâ"],
                ["mellat", "Nation", "melal", "mellat-hâ"],
                ["elm", "Wissenschaft", "olum", "elm-hâ"],
                ["hâl", "Zustand", "ahvâl", "hâl-hâ"],
                ["nazar", "Meinung", "anzâr", "nazar-hâ"],
                ["shakl", "Form", "ashkâl", "shakl-hâ"],
                ["masale", "Problem", "masâel", "masale-hâ"],
                ["dowlat", "Regierung", "dovel", "dowlat-hâ"]
              ]
            }
          ],
          examples: []
        },

        {
          id: "plural_no_number",
          title: "2.4 Kein Plural nach Zahlen!",
          rule: "Im Gegensatz zum Deutschen bleibt das Substantiv nach einer Zahl im Singular. Keine Pluralendung nötig.",
          examples: [
            { romanized: "se ketâb", german: "drei Buch (= drei Bücher)" },
            { romanized: "panj doktor", german: "fünf Arzt (= fünf Ärzte)" },
            { romanized: "sad nafar", german: "hundert Person (= hundert Personen)" },
            { romanized: "do mâshin", german: "zwei Auto (= zwei Autos)" }
          ],
          note: "Merkhilfe: Die Zahl trägt die Information über Menge — der Plural am Nomen wäre redundant."
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — EZAFE
    ───────────────────────────────────────────── */
    {
      id: "ezafe",
      title: "3. Die Ezâfe-Konstruktion",
      intro: "Ezâfe (arabisch: إضافة, »Hinzufügung«) ist ein kurzer Vokal -e (nach Vokalen: -ye), der zwei Wörter verbindet. Er ist das Rückgrat der persischen Nominalphrase und hat keine direkte Entsprechung im Deutschen.",

      subsections: [

        {
          id: "ezafe_forms",
          title: "3.1 Form: -e vs. -ye",
          rule: "Nach Konsonanten steht -e, nach Vokalen steht -ye.",
          tables: [
            {
              headers: ["Endung des ersten Wortes", "Ezâfe-Form", "Beispiel"],
              rows: [
                ["Konsonant", "-e", "ketâb-e bozorg"],
                ["Vokal -â", "-ye", "âqâ-ye ..."],
                ["Vokal -u", "-ye", "bâzu-ye ..."],
                ["stummes -e", "-ye", "khâne-ye bozorg"],
                ["Vokal -i", "-ye", "tâksi-ye ..."]
              ]
            }
          ],
          examples: []
        },

        {
          id: "ezafe_adjective",
          title: "3.2 Typ 1: Substantiv + Adjektiv",
          rule: "Das Adjektiv steht NACH dem Substantiv — das Gegenteil des Deutschen. Struktur: Nomen + -e + Adjektiv. Bei mehreren Adjektiven bekommt jedes seine eigene Ezâfe.",
          examples: [
            { romanized: "ketâb-e bozorg", german: "das große Buch (Buch-EZ groß)" },
            { romanized: "mard-e khub", german: "der gute Mann" },
            { romanized: "chây-e sard", german: "der kalte Tee" },
            { romanized: "otâq-e kuchek", german: "das kleine Zimmer" },
            { romanized: "khâne-ye qadim", german: "das alte Haus" },
            { romanized: "hava-ye garm", german: "das warme Wetter" },
            { romanized: "ketâb-e bozorg-e siyâh", german: "das große schwarze Buch (jedes Adjektiv bekommt eigene Ezâfe)" }
          ]
        },

        {
          id: "ezafe_genitive",
          title: "3.3 Typ 2: Genitiv / Besitz",
          rule: "Der Besitzer steht NACH dem Besessenen — umgekehrt zum Deutschen. Struktur: Besessenes + -e + Besitzer.",
          tables: [
            {
              caption: "Mit Personalpronomen",
              headers: ["Deutsch", "Romanisiert"],
              rows: [
                ["mein …", "…-e man"],
                ["dein …", "…-e to"],
                ["sein·ihr …", "…-e u"],
                ["unser …", "…-e mâ"],
                ["euer·Ihr …", "…-e shomâ"],
                ["ihr … (Pl.)", "…-e ânhâ"]
              ]
            }
          ],
          examples: [
            { romanized: "ketâb-e Ali", german: "Alis Buch (Buch-EZ Ali)" },
            { romanized: "pedar-e man", german: "mein Vater (Vater-EZ ich)" },
            { romanized: "mâdar-e to", german: "deine Mutter" },
            { romanized: "dar-e khâne", german: "die Haustür (Tür-EZ Haus)" },
            { romanized: "zabân-e fârsi", german: "die persische Sprache" },
            { romanized: "peytâxt-e Irân", german: "die Hauptstadt Irans" },
            { romanized: "ketâb-e man", german: "mein Buch" },
            { romanized: "khâne-ye mâ", german: "unser Haus" }
          ]
        },

        {
          id: "ezafe_chains",
          title: "3.4 Typ 3: Ketten",
          rule: "Mehrere Ezâfe-Verbindungen hintereinander sind möglich und häufig. Jedes Glied der Kette bekommt seine eigene Ezâfe. Von links nach rechts lesen.",
          examples: [
            { romanized: "ostâd-e zabân-e fârsi", german: "der Persischlehrer (Lehrer + Sprache + Persisch)" },
            { romanized: "dar-e otâq-e man", german: "die Tür meines Zimmers" },
            { romanized: "ketâb-e târikh-e Irân", german: "das Buch der Geschichte Irans" },
            { romanized: "dust-e pedar-e Ali", german: "der Freund von Alis Vater" }
          ]
        },

        {
          id: "ezafe_special",
          title: "3.5 Besonderheiten und Stolperfallen",
          rule: "Kein Artikel: Persisch hat keinen bestimmten oder unbestimmten Artikel. Die Ezâfe ist artikellos — der Kontext entscheidet. Unbestimmtheit wird mit dem Suffix -i am Nomen ausgedrückt. Bei Pluralformen hängt die Ezâfe nach dem Pluralsuffix.",
          examples: [
            { romanized: "ketâb-e bozorg", german: "das große Buch ODER ein großes Buch (Kontext entscheidet)" },
            { romanized: "ketâbi khândam", german: "ich las ein Buch (-i = unbestimmt)" },
            { romanized: "mardi âmad", german: "ein Mann kam" },
            { romanized: "ketâb-hâ-ye bozorg", german: "die großen Bücher (PL-Suffix + Ezâfe)" },
            { romanized: "dust-ân-e man", german: "meine Freunde (PL-Suffix + Ezâfe)" }
          ]
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — ACCUSATIVE WITH RÂ
    ───────────────────────────────────────────── */
    {
      id: "accusative_ra",
      title: "4. Der Akkusativ mit râ",
      intro: "Im Persischen wird ein bestimmtes direktes Objekt mit der Partikel râ markiert. Râ ist eine Postposition — sie steht nach dem Objekt. Unbestimmte Objekte bekommen kein râ.",

      subsections: [

        {
          id: "ra_basic",
          title: "4.1 Grundstruktur",
          rule: "Grundstruktur: Subjekt + Objekt + râ + Verb. Râ kommt direkt nach dem Objekt — kurz vor dem Verb.",
          examples: [
            { romanized: "Man ketâb râ khândam.", german: "Ich las das Buch. (Ich Buch RÂ las)" },
            { romanized: "Ali in mive râ kharid.", german: "Ali kaufte dieses Obst." },
            { romanized: "Mâ film râ didim.", german: "Wir sahen den Film." },
            { romanized: "U nâme râ nevesht.", german: "Er·Sie schrieb den Brief." }
          ]
        },

        {
          id: "ra_definite",
          title: "4.2 Bestimmt vs. unbestimmt — die entscheidende Unterscheidung",
          rule: "Mit râ = bestimmtes Objekt (Sprecher und Hörer wissen, welches Objekt gemeint ist). Ohne râ = unbestimmtes Objekt (generisch, unspezifisch).",
          tables: [
            {
              headers: ["Mit râ (bestimmt)", "Ohne râ (unbestimmt)"],
              rows: [
                ["Man mâhi râ khordam. (Ich aß den Fisch.)", "Man mâhi khordam. (Ich aß Fisch.)"],
                ["U ketâb râ dâd. (Er gab das Buch.)", "U ketâb dâd. (Er gab ein Buch.)"],
                ["Ali mâshin râ forokht. (Ali verkaufte das Auto.)", "Ali mâshin forokht. (Ali verkaufte ein Auto.)"],
                ["Man âb râ nushidam. (Ich trank das Wasser.)", "Man âb nushidam. (Ich trank Wasser.)"]
              ]
            }
          ],
          examples: [],
          note: "Bestimmt = demonstratives Pronomen (in/ân + Nomen), Eigenname, Personalpronomen oder kontextuell etabliertes Nomen."
        },

        {
          id: "ra_ezafe",
          title: "4.3 Râ nach Ezâfe-Phrasen",
          rule: "Wenn das Objekt eine Ezâfe-Phrase ist, kommt râ ans Ende der gesamten Phrase — nach dem letzten Glied.",
          examples: [
            { romanized: "Man ketâb-e bozorg râ khândam.", german: "Ich las das große Buch." },
            { romanized: "Ali khâne-ye qadim râ kharid.", german: "Ali kaufte das alte Haus." },
            { romanized: "Mâ film-e irâni râ didim.", german: "Wir sahen den iranischen Film." },
            { romanized: "U ketâb-hâ-ye man râ gereft.", german: "Er nahm meine Bücher." },
            { romanized: "Man ostâd-e zabân-e fârsi râ shenâkhtam.", german: "Ich kannte den Persischlehrer." }
          ]
        },

        {
          id: "ra_pronouns",
          title: "4.4 Râ mit Personalpronomen",
          rule: "Bei Pronomen verschmilzt râ oft mit dem Pronomen zu einer festen kontrahierten Form.",
          tables: [
            {
              headers: ["Pronomen", "+ râ", "Kurzform", "Bedeutung"],
              rows: [
                ["man", "man râ", "mârâ / maro", "mich"],
                ["to", "to râ", "torâ / toro", "dich"],
                ["u", "u râ", "urâ / uro", "ihn·sie"],
                ["mâ", "mâ râ", "mârâ", "uns"],
                ["shomâ", "shomâ râ", "shomârâ", "euch·Sie"],
                ["ânhâ", "ânhâ râ", "ânhârâ", "sie (Pl.)"]
              ]
            }
          ],
          examples: [
            { romanized: "U mârâ did.", german: "Er·Sie sah uns." },
            { romanized: "Man torâ dust dâram.", german: "Ich habe dich lieb." },
            { romanized: "Ânhâ urâ shenâkhtand.", german: "Sie erkannten ihn." }
          ]
        },

        {
          id: "ra_modal",
          title: "4.5 Râ bei Modalverben und verneinten Sätzen",
          rule: "Râ bleibt immer direkt nach dem Objekt — vor dem gesamten Verbalkomplex, auch bei Modalverben oder Verneinung.",
          examples: [
            { romanized: "Man ketâb râ mikhâham khândan.", german: "Ich möchte das Buch lesen." },
            { romanized: "Âyâ in film râ didi?", german: "Hast du diesen Film gesehen?" },
            { romanized: "U ketâb râ nemixâhad bekharad.", german: "Er will das Buch nicht kaufen." },
            { romanized: "Mâ in kâr râ nemitavânim kardan.", german: "Wir können diese Arbeit nicht tun." }
          ]
        },

        {
          id: "ra_decision",
          title: "4.6 Entscheidungsregel: Wann râ?",
          rule: "Einfache Prüfung: Ist das Objekt bestimmt oder spezifisch? Ja → râ. Nein → kein râ.",
          examples: [
            { romanized: "in ketâb râ ...", german: "dieses Buch RÂ → bestimmt (Demonstrativum) → râ" },
            { romanized: "Ali râ ...", german: "Ali RÂ → Eigenname → immer bestimmt → râ" },
            { romanized: "urâ ...", german: "ihn·sie RÂ → Pronomen → immer bestimmt → râ" },
            { romanized: "ketâb ...", german: "Buch (ohne Artikel) → unbestimmt → kein râ" }
          ],
          note: "Bestimmtheit-Auslöser: in/ân (dieser/jener) + Nomen · Eigenname · Personalpronomen · kontextuell klares Nomen"
        }
      ]
    }
  ]
};
