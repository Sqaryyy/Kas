// ── Form Data ──────────────────────────────────────────────────────────────
export interface FormData {
  // Registration
  ime: string;
  prezime: string;
  email: string;
  telefon: string;
  godine: string;
  grad: string;
  datum: string;
  // Demografija
  pol: string;
  obrazovanje: string;
  mesto: string;
  // Q1
  q0_promena_misljenja: string;
  // Q2
  q2_institucije_interes: string;
  // Q3
  q3_veze_vs_obrazovanje: string;
  // Q4
  q4_protesti_generalno: string;
  // Q5
  q6_otvorenost_promenama: string;
  // Q6
  q8_seksisticki_komentari: string;
  // Q7
  q9_eu_clanstvo: string;
  // Q8
  q11_sloboda_govora: string;
  // Q9
  q13_zabrana_mreza_maloletnici: string;
  // Q10
  q14_odlazak_razmisljanje: string;
  // Q11
  q11_razlicitost: string;
}

export const EMPTY_FORM: FormData = {
  ime: "", prezime: "", email: "", telefon: "", godine: "", grad: "", datum: "",
  pol: "", obrazovanje: "", mesto: "",
  q0_promena_misljenja: "",
  q2_institucije_interes: "",
  q3_veze_vs_obrazovanje: "",
  q4_protesti_generalno: "",
  q6_otvorenost_promenama: "",
  q8_seksisticki_komentari: "",
  q9_eu_clanstvo: "",
  q11_sloboda_govora: "",
  q13_zabrana_mreza_maloletnici: "",
  q14_odlazak_razmisljanje: "",
  q11_razlicitost: "",
};

// ── Question types ─────────────────────────────────────────────────────────
export type ScaleQuestion = {
  kind: "scale";
  field: string;
  label: string;
  scaleLabels?: [string, string];
  allLabels?: [string, string, string, string, string];
};

export type ChoiceQuestion = {
  kind: "choice";
  field: string;
  label: string;
  options: string[];
};

export type Question = ScaleQuestion | ChoiceQuestion;

// ── Step types ─────────────────────────────────────────────────────────────
export type Step =
  | { type: "intro" }
  | { type: "section"; id: string; title: string; questions: Question[] }
  | { type: "demografija" }
  | { type: "done" };

// ── Constants ──────────────────────────────────────────────────────────────
export const DATES = [
  "Subota, 15. mart — 12–16h",
  "Subota, 22. mart — 12–16h",
  "Subota, 29. mart — 12–16h",
];

export const PREVIEW_QUESTIONS = [
  "Da li Srbija treba da uđe u EU?",
  "Treba li zabraniti socijalne mreže za mlađe od 14 godina?",
  "Da li treba da postoji apsolutna sloboda govora?",
];

// ── All steps in order ─────────────────────────────────────────────────────
export const STEPS: Step[] = [
  { type: "intro" },
  {
    type: "section", id: "start", title: "Za početak",
    questions: [
      {
        field: "q0_promena_misljenja", kind: "choice",
        label: "Kada si poslednji put promenio/la mišljenje nakon razgovora sa nekim ko se sa tobom nije slagao?",
        options: ["Često mi se to dešava", "Ponekad", "Retko", "Nikada"],
      },
      {
        field: "q2_institucije_interes", kind: "scale",
        label: "Da li veruješ da institucije Srbije rade u interesu građana?",
        scaleLabels: ["Uopšte ne verujem", "U potpunosti verujem"],
      },
      {
        field: "q3_veze_vs_obrazovanje", kind: "scale",
        label: "U Srbiji je za uspeh u životu važnije imati vezu nego biti obrazovan.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
      {
        field: "q4_protesti_generalno", kind: "scale",
        label: "Kako generalno gledaš na proteste koji su se održavali u Srbiji u poslednjih godinu dana?",
        scaleLabels: ["Veoma negativno", "Veoma pozitivno"],
      },
    ],
  },
  {
    type: "section", id: "vrednosti", title: "Vrednosti i društvo",
    questions: [
      {
        field: "q6_otvorenost_promenama", kind: "scale",
        label: "Društvo u Srbiji bi trebalo da bude otvorenije za promene u tradicionalnim vrednostima i načinu života.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
      {
        field: "q8_seksisticki_komentari", kind: "choice",
        label: "Koliko često primećuješ seksističke komentare ili šale u svakodnevnom životu?",
        options: ["Nikada", "Retko", "Ponekad", "Često"],
      },
      {
        field: "q9_eu_clanstvo", kind: "scale",
        label: "Članstvo Srbije u Evropskoj uniji bi poboljšalo život mladih u Srbiji.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
    ],
  },
  {
    type: "section", id: "sloboda", title: "Sloboda i odlazak",
    questions: [
      {
        field: "q11_sloboda_govora", kind: "scale",
        label: "U Srbiji ljudi mogu slobodno da izražavaju mišljenje bez straha od posledica.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
      {
        field: "q13_zabrana_mreza_maloletnici", kind: "choice",
        label: "Da li bi podržao/la zabranu društvenih mreža za maloletnike?",
        options: ["Da", "Ne", "Nisam siguran/na"],
      },
      {
        field: "q14_odlazak_razmisljanje", kind: "choice",
        label: "Koliko često razmišljaš o odlasku iz Srbije?",
        options: ["Nikada", "Povremeno", "Često", "Planiram odlazak"],
      },
      {
        field: "q11_razlicitost", kind: "scale",
        label: "Kako biste se osećali kada bi neko od vaših bliskih prijatelja bio u vezi sa osobom različite verske, etničke ili seksualne pripadnosti?",
        allLabels: ["Veoma neprijatno", "Donekle neprijatno", "Ravnodušno", "Donekle prijatno", "Veoma prijatno"],
      },
    ],
  },
  { type: "demografija" },
  { type: "done" },
];

// Steps that count toward the progress bar (exclude intro and done)
export const PROGRESS_STEPS = STEPS.filter(
  (s) => s.type !== "intro" && s.type !== "done"
);