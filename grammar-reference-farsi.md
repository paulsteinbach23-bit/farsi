# Farsi Grammar Reference
## For learners and as structured reference for Claude Code

This document covers four core grammar topics in depth.
It serves two purposes simultaneously:
1. **User-facing content** — explanations, tables, examples for the in-app grammar lexicon
2. **Claude Code reference** — the machine-readable block at the end defines all rules programmatically for building exercises

---

## 1. Verb Conjugation

### 1.1 The two stems — the foundation

Every Persian verb has two stems. Everything else is built on them:

| Concept | Persian term | Function |
|---|---|---|
| Past stem | bon-e mâzi | Base for all past tenses |
| Present stem | bon-e mozâre | Base for present, imperative, subjunctive |

The **past stem** is always derived by removing the infinitive ending **-an**:
- raft-an → **raft**
- khând-an → **khând**
- kard-an → **kard**

The **present stem** must be memorized for irregular verbs. For a small set of regular verbs it matches the past stem.

---

### 1.2 Personal endings

These endings attach to both stems and are the same across all tenses:

| Person | Singular | Plural |
|---|---|---|
| 1st (I / we) | **-am** | **-im** |
| 2nd (you / you pl.) | **-i** | **-id** |
| 3rd (he·she·it / they) | **-ad** | **-and** |

Important: the 3rd person singular past takes **no ending** — the stem stands alone.

---

### 1.3 Present tense

**Formation:** prefix **mi-** + present stem + personal ending

Example **raftan** (to go) — present stem: **rav**

| Person | Romanized | German |
|---|---|---|
| man | mi-**rav**-am | ich gehe |
| to | mi-**rav**-i | du gehst |
| u | mi-**rav**-ad | er·sie geht |
| mâ | mi-**rav**-im | wir gehen |
| shomâ | mi-**rav**-id | ihr geht / Sie gehen |
| ânhâ | mi-**rav**-and | sie gehen |

Example **khândan** (to read) — present stem: **khân**

| Person | Romanized | German |
|---|---|---|
| man | mi-**khân**-am | ich lese |
| to | mi-**khân**-i | du liest |
| u | mi-**khân**-ad | er·sie liest |
| mâ | mi-**khân**-im | wir lesen |
| shomâ | mi-**khân**-id | ihr lest |
| ânhâ | mi-**khân**-and | sie lesen |

---

### 1.4 Simple past (preterite)

**Formation:** past stem + personal ending (no mi-, 3rd sg. = bare stem)

Example **raftan** (to go) — past stem: **raft**

| Person | Romanized | German |
|---|---|---|
| man | **raft**-am | ich ging |
| to | **raft**-i | du gingst |
| u | **raft** | er·sie ging |
| mâ | **raft**-im | wir gingen |
| shomâ | **raft**-id | ihr gingt |
| ânhâ | **raft**-and | sie gingen |

Example **didan** (to see) — past stem: **did**

| Person | Romanized | German |
|---|---|---|
| man | **did**-am | ich sah |
| to | **did**-i | du sahst |
| u | **did** | er·sie sah |
| mâ | **did**-im | wir sahen |
| shomâ | **did**-id | ihr saht |
| ânhâ | **did**-and | sie sahen |

---

### 1.5 Negation

**Present:** prefix **nemi-** replaces **mi-**
- miravam → **nemi**ravam (ich gehe nicht)
- mikonam → **nemi**konam (ich tue nicht)

**Past:** prefix **na-** before the stem
- raftam → **na**raftam (ich ging nicht)
- didam → **na**didam (ich sah nicht)

**budan (to be) — special negative:**
- nistam, nisti, nist, nistim, nistid, nistand

---

### 1.6 The verb "to be" — budan (highly irregular)

**budan** has two present-tense forms:

**Form A — hast- (full, emphatic form):**

| Person | Romanized | German |
|---|---|---|
| man | hast-am | ich bin |
| to | hast-i | du bist |
| u | hast / ast | er·sie ist |
| mâ | hast-im | wir sind |
| shomâ | hast-id | ihr seid |
| ânhâ | hast-and | sie sind |

**Form B — short suffix copula (attached to predicates):**

The copula merges with the preceding word — the "to be" verb becomes a clitic:

| Person | Suffix | Example | German |
|---|---|---|---|
| man | -am | khub**am** | ich bin gut |
| to | -i | khub**i** | du bist gut |
| u | -e / -ast | khub**e** / khub ast | er·sie ist gut |
| mâ | -im | khub**im** | wir sind gut |
| shomâ | -id | khub**id** | ihr seid gut |
| ânhâ | -and | khub**and** | sie sind gut |

**Past tense of budan:**

| Person | Romanized | German |
|---|---|---|
| man | bud-am | ich war |
| to | bud-i | du warst |
| u | bud | er·sie war |
| mâ | bud-im | wir waren |
| shomâ | bud-id | ihr wart |
| ânhâ | bud-and | sie waren |

---

### 1.7 The verb "to have" — dâshtan (special rule: no mi-)

**dâshtan** takes **no mi- prefix** in the present tense — the only common verb with this property.

Present stem: **dâr**

| Person | Romanized | German |
|---|---|---|
| man | **dâr**-am | ich habe |
| to | **dâr**-i | du hast |
| u | **dâr**-ad | er·sie hat |
| mâ | **dâr**-im | wir haben |
| shomâ | **dâr**-id | ihr habt |
| ânhâ | **dâr**-and | sie haben |

Past (stem: **dâsht**): man dâsht-am, to dâsht-i, u dâsht, etc.

---

### 1.8 Irregular verbs — complete reference list

The present stem cannot be derived from the infinitive for these verbs and must be memorized:

| Infinitive | Meaning (DE) | Past stem | Present stem |
|---|---|---|---|
| raftan | gehen | raft | rav |
| âmadan | kommen | âmad | â(y) |
| didan | sehen | did | bin |
| kardan | tun / machen | kard | kon |
| goftan | sagen | goft | gu |
| dânestan | wissen | dânest | dân |
| khândan | lesen / singen | khând | khân |
| neveshtan | schreiben | nevesht | nevis |
| khordan | essen / trinken | khord | khor |
| dâdan | geben | dâd | deh |
| gereftan | nehmen | gereft | gir |
| bordan | tragen / bringen | bord | bar |
| âvordan | mitbringen | âvord | âvar |
| shodan | werden | shod | shav |
| budan | sein | bud | bâsh |
| dâshtan | haben | dâsht | dâr |
| zadan | schlagen / spielen | zad | zan |
| keshidan | ziehen / zeichnen | keshid | kesh |
| residan | ankommen | resid | res |
| neshestan | sitzen | neshast | neshin |
| khâstan | wollen | khâst | khâh |
| tavânestan | können | tavânest | tavân |
| oftâdan | fallen | oftâd | oft |
| gozâshtan | legen / lassen | gozâsht | gozâr |
| forkhtan | verkaufen | fokht | forush |

**Full conjugation examples for selected irregular verbs:**

**dâdan (geben)** — present stem: deh

| Person | Present | Past |
|---|---|---|
| man | mi-deh-am | dâd-am |
| to | mi-deh-i | dâd-i |
| u | mi-deh-ad | dâd |
| mâ | mi-deh-im | dâd-im |
| shomâ | mi-deh-id | dâd-id |
| ânhâ | mi-deh-and | dâd-and |

**goftan (sagen)** — present stem: gu (glide y inserted after vowel stem)

| Person | Present | Past |
|---|---|---|
| man | mi-gu-yam | goft-am |
| to | mi-gu-yi | goft-i |
| u | mi-gu-yad | goft |
| mâ | mi-gu-yim | goft-im |
| shomâ | mi-gu-yid | goft-id |
| ânhâ | mi-gu-yand | goft-and |

**âmadan (kommen)** — present stem: â(y)

| Person | Present | Past |
|---|---|---|
| man | mi-yâ-m | âmad-am |
| to | mi-yâ-i | âmad-i |
| u | mi-yâ-yad | âmad |
| mâ | mi-yâ-yim | âmad-im |
| shomâ | mi-yâ-yid | âmad-id |
| ânhâ | mi-yâ-yand | âmad-and |

---

## 2. Plural Formation of Nouns

### 2.1 The two standard suffixes

Persian has two regular plural endings:

**A) -hâ** — universal, colloquial, usable with any noun

- ketâb → ketâb-**hâ** (Bücher)
- miz → miz-**hâ** (Tische)
- doktor → doktor-**hâ** (Ärzte)
- shahr → shahr-**hâ** (Städte)
- bache → bache-**hâ** (Kinder)

**B) -ân** — formal, mainly for animate nouns (persons, animals)

- doktor → doktor-**ân** (Ärzte — formal)
- ostâd → ostâd-**ân** (Professoren)
- dâneshju → dâneshju-**yân** (Studenten — y-glide after vowel)
- dust → dust-**ân** (Freunde — formal)
- mard → mard-**ân** (Männer — formal)

Rule of thumb: In everyday speech **-hâ** dominates. **-ân** sounds literary and elevated.

---

### 2.2 Phonological adjustments

When a word ends in a vowel, a glide consonant is inserted:

| Word ending | Plural with -hâ | Plural with -ân |
|---|---|---|
| Consonant | ketâb → ketâb-hâ | ostâd → ostâd-ân |
| Vowel -u | bâzu → bâzu-hâ | dâneshju → dâneshju-yân |
| Vowel -i | tâksi → tâksi-hâ | — |
| Vowel -â | âqâ → âqâ-hâ | âqâ-yân |
| -e (silent) | khâne → khâne-hâ | — |

---

### 2.3 Arabic loanwords — broken plurals

Many Persian words originate from Arabic and carry Arabic broken plurals (internal vowel change rather than a suffix). These appear mainly in formal and written contexts:

| Singular | Meaning (DE) | Arabic plural | Persian alternative |
|---|---|---|---|
| ketâb | Buch | kotob | ketâb-hâ |
| mellat | Nation | melal | mellat-hâ |
| elm | Wissenschaft | olum | elm-hâ |
| aql | Vernunft | oqul | aql-hâ |
| hâl | Zustand | ahvâl | hâl-hâ |
| nazar | Meinung | anzâr | nazar-hâ |
| shakl | Form | ashkâl | shakl-hâ |
| masale | Problem | masâel | masale-hâ |
| dowlat | Regierung | dovel | dowlat-hâ |

**For learners:** Arabic plurals need not be produced actively. Recognize them in newspapers and formal speech. The -hâ form is always acceptable in conversation.

---

### 2.4 Special cases and frequent exceptions

| Singular | Meaning (DE) | Plural | Note |
|---|---|---|---|
| kas | Person | kasân / kasâni | -âni ending |
| nafar | Person (counter) | nafarân | only -ân |
| zan | Frau | zanân / zan-hâ | both acceptable |
| mard | Mann | mardân / mard-hâ | both acceptable |
| bachche | Kind | bachche-hâ | -hâ standard |
| dust | Freund | dustân / dust-hâ | both acceptable |

---

### 2.5 No plural after numbers!

Unlike German, the noun stays singular after any numeral:

- se ketâb = drei Buch (not: drei Bücher)
- panj doktor = fünf Arzt
- sad nafar = hundert Person(en)

---

## 3. The Ezâfe Construction

### 3.1 What is Ezâfe?

Ezâfe (Arabic: إضافة, "addition") is a short vowel **-e** (after vowels: **-ye**) that links two words. It is the backbone of the Persian noun phrase.

Ezâfe connects:
1. Noun + Adjective (attributive)
2. Noun + Noun (genitive / possession)
3. Noun + Proper name
4. Chains of multiple elements

The adjective follows the noun in Persian — the opposite of German:

| German | Persian (literal) | Romanized |
|---|---|---|
| das große Buch | Buch-EZ groß | ketâb-**e** bozorg |
| mein Vater | Vater-EZ ich | pedar-**e** man |
| die Stadt Teheran | Stadt-EZ Teheran | shahr-**e** Tehrân |

---

### 3.2 The Ezâfe rule: -e vs. -ye

| Ending of first word | Ezâfe form | Example |
|---|---|---|
| Consonant | **-e** | ketâb-**e** bozorg |
| Vowel -â | **-ye** | âqâ-**ye** … |
| Vowel -u | **-ye** | bâzu-**ye** … |
| Vowel -e (silent) | **-ye** | khâne-**ye** bozorg |
| Vowel -i | **-ye** | tâksi-**ye** … |

---

### 3.3 Ezâfe type 1: Noun + Adjective

**Structure: Noun + -e + Adjective**

| Romanized | Literal | German |
|---|---|---|
| ketâb-e bozorg | Buch-EZ groß | das große Buch |
| mard-e khub | Mann-EZ gut | der gute Mann |
| chây-e sard | Tee-EZ kalt | der kalte Tee |
| otâq-e kuchek | Zimmer-EZ klein | das kleine Zimmer |
| khâne-ye qadim | Haus-EZ alt | das alte Haus |
| zan-e zibâ | Frau-EZ schön | die schöne Frau |
| hava-ye garm | Luft-EZ warm | das warme Wetter |

Multiple adjectives — each gets its own ezâfe:
- ketâb-e bozorg-e siyâh = das große schwarze Buch

---

### 3.4 Ezâfe type 2: Genitive / Possession

**Structure: Noun₁ + -e + Noun₂ (possessor)**

The possessor always follows the possessed — opposite of German:

| Romanized | Literal | German |
|---|---|---|
| ketâb-e Ali | Buch-EZ Ali | Alis Buch |
| pedar-e man | Vater-EZ ich | mein Vater |
| mâdar-e to | Mutter-EZ du | deine Mutter |
| dar-e khâne | Tür-EZ Haus | die Haustür |
| zabân-e fârsi | Sprache-EZ Persisch | die persische Sprache |
| peytâxt-e Irân | Hauptstadt-EZ Iran | die Hauptstadt Irans |

With personal pronouns:

| German | Romanized |
|---|---|
| mein … | …-e man |
| dein … | …-e to |
| sein·ihr … | …-e u |
| unser … | …-e mâ |
| euer·Ihr … | …-e shomâ |
| ihr … (Pl.) | …-e ânhâ |

Examples:
- ketâb-e man = mein Buch
- khâne-ye mâ = unser Haus
- dust-e u = sein·ihr Freund

---

### 3.5 Ezâfe type 3: Chains

Multiple ezâfe links in sequence are common. Read left to right:

| Romanized | Analysis | German |
|---|---|---|
| ostâd-e zabân-e fârsi | Lehrer + Sprache + Persisch | der Persischlehrer |
| dar-e otâq-e man | Tür + Zimmer + ich | die Tür meines Zimmers |
| ketâb-e târikh-e Irân | Buch + Geschichte + Iran | das Buch der Geschichte Irans |
| dust-e pedar-e Ali | Freund + Vater + Ali | der Freund von Alis Vater |

---

### 3.6 Important properties and pitfalls

**No article:** Persian has no definite or indefinite article (no der/die/das, no ein/eine). Ezâfe is articleless:
- ketâb-e bozorg = das große Buch OR ein großes Buch (context decides)

**Indefiniteness with -i:** An indefinite noun can take the suffix **-i** (equivalent to "ein"):
- ketâb**i** khândam = ich las ein Buch
- mard**i** âmad = ein Mann kam

**Ezâfe with plural:** Ezâfe attaches after the plural suffix:
- ketâb-hâ-**ye** bozorg = die großen Bücher (Bücher-PL-EZ groß)
- dust-ân-**e** man = meine Freunde (Freunde-PL-EZ ich)

---

## 4. The Accusative with râ

### 4.1 Core principle

In Persian, a **definite direct object** is marked with the particle **râ**. Râ is a **postposition** — it follows the object rather than preceding it.

**Basic structure:** Subject + Object + **râ** + Verb

| Romanized | Literal | German |
|---|---|---|
| Man ketâb râ khândam. | Ich Buch RAˮ las. | Ich las das Buch. |
| Ali in mive râ kharid. | Ali dieses Obst RAˮ kaufte. | Ali kaufte dieses Obst. |
| Mâ film râ didim. | Wir Film RAˮ sahen. | Wir sahen den Film. |

---

### 4.2 The critical distinction: definite vs. indefinite

**With râ = definite object** (speaker and listener know which object is meant):
- Man **ketâb râ** khândam. — Ich las **das** Buch. (a specific book)
- U **âb râ** kharid. — Er kaufte **das** Wasser. (this specific water)

**Without râ = indefinite object** (generic, unspecific):
- Man **ketâb** khândam. — Ich las **ein** Buch. (some book)
- U **âb** kharid. — Er kaufte **Wasser**. (water in general)

Minimal pairs:

| With râ (definite) | Without râ (indefinite) |
|---|---|
| Man mâhi râ khordam. (Ich aß den Fisch.) | Man mâhi khordam. (Ich aß Fisch.) |
| U ketâb râ dâd. (Er gab das Buch.) | U ketâb dâd. (Er gab ein Buch.) |
| Ali mâshin râ forokht. (Ali verkaufte das Auto.) | Ali mâshin forokht. (Ali verkaufte ein Auto.) |

---

### 4.3 Râ after Ezâfe phrases

When the object contains an ezâfe chain, râ follows the entire phrase:

| Romanized | German |
|---|---|
| Man ketâb-e bozorg **râ** khândam. | Ich las das große Buch. |
| Ali khâne-ye qadim **râ** kharid. | Ali kaufte das alte Haus. |
| Mâ film-e irâni **râ** didim. | Wir sahen den iranischen Film. |
| U ketâb-hâ-ye man **râ** gereft. | Er nahm meine Bücher. |

---

### 4.4 Râ with personal pronouns

With pronouns, râ often fuses into a fixed contracted form:

| Pronoun | + râ | Contracted | Meaning |
|---|---|---|---|
| man | man râ | **mârâ** / maro | mich |
| to | to râ | **torâ** / toro | dich |
| u | u râ | **urâ** / uro | ihn·sie |
| mâ | mâ râ | **mârâ** | uns |
| shomâ | shomâ râ | **shomârâ** | euch·Sie |
| ânhâ | ânhâ râ | **ânhârâ** | sie (Pl.) |

Examples:
- U **mârâ** did. — Er sah uns.
- Man **torâ** dust dâram. — Ich habe dich lieb.
- Ânhâ **urâ** shenâkhtand. — Sie erkannten ihn.

---

### 4.5 Position of râ with modal verbs

Râ stays directly after the object — before the verb, even with modals:

| Romanized | German |
|---|---|
| Man ketâb râ mikhâham khândan. | Ich möchte das Buch lesen. |
| Âyâ in film râ didi? | Hast du diesen Film gesehen? |
| U ketâb râ nemixâhad bekharad. | Er will das Buch nicht kaufen. |

---

### 4.6 Decision tree for râ

```
Is the noun a direct object?
  └─ Yes → Is it definite / specific?
               ├─ Yes → USE râ
               └─ No  → NO râ

Definite = demonstrative (in/ân + noun), proper name,
           pronoun, or contextually established noun.
```

---

## Machine-readable Rule Block for Claude Code

> **Usage:** Copy this block into your CLAUDE.md or reference it in prompts as:
> "Apply the grammar rules defined in `docs/grammar-reference.md`
>  when generating exercises, validating answers, or explaining errors."

```json
{
  "farsi_grammar_rules": {

    "verb_conjugation": {
      "stems": {
        "past_stem": "infinitive minus -an suffix",
        "present_stem": "must be memorized for irregular verbs"
      },
      "personal_endings": {
        "1sg": "-am", "2sg": "-i", "3sg_present": "-ad", "3sg_past": "Ø (no ending)",
        "1pl": "-im", "2pl": "-id", "3pl": "-and"
      },
      "tenses": {
        "present":          "mi- + present_stem + personal_ending",
        "past_simple":      "past_stem + personal_ending (3sg: Ø)",
        "negative_present": "nemi- + present_stem + personal_ending",
        "negative_past":    "na- + past_stem + personal_ending"
      },
      "special_verbs": {
        "dâshtan": "NO mi- prefix in present tense; present stem: dâr",
        "budan":   "two forms: hast- (full) or clitic suffix on predicate; negative: nist-",
        "goftan":  "present stem gu- triggers y-glide before vowel endings"
      },
      "glide_rule": "after vowel-final present stems, insert -y- before endings",
      "irregular_verbs": [
        {"infinitive": "raftan",     "meaning_de": "gehen",           "past_stem": "raft",    "present_stem": "rav"},
        {"infinitive": "âmadan",     "meaning_de": "kommen",          "past_stem": "âmad",   "present_stem": "â(y)"},
        {"infinitive": "didan",      "meaning_de": "sehen",           "past_stem": "did",    "present_stem": "bin"},
        {"infinitive": "kardan",     "meaning_de": "tun/machen",      "past_stem": "kard",   "present_stem": "kon"},
        {"infinitive": "goftan",     "meaning_de": "sagen",           "past_stem": "goft",   "present_stem": "gu"},
        {"infinitive": "dânestan",   "meaning_de": "wissen",          "past_stem": "dânest", "present_stem": "dân"},
        {"infinitive": "khândan",    "meaning_de": "lesen/singen",    "past_stem": "khând",  "present_stem": "khân"},
        {"infinitive": "neveshtan",  "meaning_de": "schreiben",       "past_stem": "nevesht","present_stem": "nevis"},
        {"infinitive": "khordan",    "meaning_de": "essen/trinken",   "past_stem": "khord",  "present_stem": "khor"},
        {"infinitive": "dâdan",      "meaning_de": "geben",           "past_stem": "dâd",    "present_stem": "deh"},
        {"infinitive": "gereftan",   "meaning_de": "nehmen",          "past_stem": "gereft", "present_stem": "gir"},
        {"infinitive": "bordan",     "meaning_de": "tragen/bringen",  "past_stem": "bord",   "present_stem": "bar"},
        {"infinitive": "shodan",     "meaning_de": "werden",          "past_stem": "shod",   "present_stem": "shav"},
        {"infinitive": "budan",      "meaning_de": "sein",            "past_stem": "bud",    "present_stem": "bâsh"},
        {"infinitive": "dâshtan",    "meaning_de": "haben",           "past_stem": "dâsht",  "present_stem": "dâr"},
        {"infinitive": "zadan",      "meaning_de": "schlagen",        "past_stem": "zad",    "present_stem": "zan"},
        {"infinitive": "neshestan",  "meaning_de": "sitzen",          "past_stem": "neshast","present_stem": "neshin"},
        {"infinitive": "khâstan",    "meaning_de": "wollen",          "past_stem": "khâst",  "present_stem": "khâh"},
        {"infinitive": "gozâshtan",  "meaning_de": "legen/lassen",    "past_stem": "gozâsht","present_stem": "gozâr"},
        {"infinitive": "oftâdan",    "meaning_de": "fallen",          "past_stem": "oftâd",  "present_stem": "oft"}
      ]
    },

    "plural": {
      "suffixes": {
        "-hâ": "universal, colloquial, animate + inanimate",
        "-ân": "formal register, mainly animate/persons"
      },
      "glide_rule": "vowel-final nouns + -ân → insert -y- (dâneshju → dâneshju-yân)",
      "after_numbers": "NO plural suffix; noun stays singular (se ketâb = three books)",
      "arabic_broken_plural": "exists in formal/written Persian; -hâ always acceptable in speech",
      "exceptions": [
        {"singular": "kas",     "plural": "kasân / kasâni"},
        {"singular": "nafar",   "plural": "nafarân"},
        {"singular": "zan",     "plural": "zanân / zan-hâ"},
        {"singular": "mard",    "plural": "mardân / mard-hâ"},
        {"singular": "bachche", "plural": "bachche-hâ"}
      ]
    },

    "ezafe": {
      "function": "connects noun+adjective (attributive) and noun+noun (genitive); forms chains",
      "forms": {
        "after_consonant": "-e",
        "after_vowel":     "-ye"
      },
      "word_order": {
        "adjective": "NOUN + ezafe + ADJECTIVE  (adjective follows noun — opposite of German)",
        "genitive":  "POSSESSED + ezafe + POSSESSOR  (possessor follows possessed)"
      },
      "with_plural": "plural_suffix + ezafe: ketâb-hâ-ye bozorg (note: -ye after -hâ vowel)",
      "chains": "each link in the chain gets its own ezafe: ostâd-e zabân-e fârsi",
      "no_article": "ezafe is articleless; definiteness determined by context",
      "indefinite_noun": "add suffix -i to noun for indefinite: ketâbi (ein Buch)"
    },

    "accusative_ra": {
      "marker": "râ — postposition, follows the object directly",
      "rule": "USE râ for definite/specific direct objects; OMIT for indefinite/generic objects",
      "word_order": "Subject + Object + râ + Verb",
      "definite_triggers": ["demonstrative (in/ân)", "proper name", "personal pronoun", "contextually established noun"],
      "position_in_ezafe_phrase": "râ follows the entire ezafe phrase: ketâb-e bozorg râ",
      "position_with_modals": "râ stays after object, before modal+verb cluster",
      "pronoun_contractions": {
        "man-râ": "mârâ",
        "to-râ":  "torâ",
        "u-râ":   "urâ",
        "mâ-râ":  "mârâ",
        "shomâ-râ": "shomârâ",
        "ânhâ-râ":  "ânhârâ"
      }
    }
  }
}
```

---

*Last updated: 2026 — for the Farsi Beginner App project.*
*Reference this file in CLAUDE.md so Claude Code loads it automatically at session start.*
