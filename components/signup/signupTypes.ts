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
  godine_grupa: string;
  obrazovanje: string;
  mesto: string;
  // Intro
  q0_promena_misljenja: string;
  q0_suprotan_stav: string;
  // II — Politika
  q1_protesti_srbija: string;
  q2_institucije_interes: string;
  q3_veze_vs_obrazovanje: string;
  q4_protesti_generalno: string;
  // III — Vrednosti
  q5_uloga_drzave: string;
  q6_otvorenost_promenama: string;
  // IV — Žene
  q7_uloga_zene: string;
  q8_seksisticki_komentari: string;
  // V — EU
  q9_eu_clanstvo: string;
  q10_referendum_eu: string;
  // VI — Sloboda govora
  q11_sloboda_govora: string;
  q12_regulacija_mreza: string;
  q13_zabrana_mreza_maloletnici: string;
  // VII — Odlazak
  q14_odlazak_razmisljanje: string;
  q15_odlazak_plan: string;
  // VIII — Manjine
  q16_prava_manjina: string;
  q17_deljenje_stana: string;
  q18_prijatelj_isti_pol: string;
}

export const EMPTY_FORM: FormData = {
  ime: "", prezime: "", email: "", telefon: "", godine: "", grad: "", datum: "",
  pol: "", godine_grupa: "", obrazovanje: "", mesto: "",
  q0_promena_misljenja: "", q0_suprotan_stav: "",
  q1_protesti_srbija: "", q2_institucije_interes: "", q3_veze_vs_obrazovanje: "", q4_protesti_generalno: "",
  q5_uloga_drzave: "", q6_otvorenost_promenama: "",
  q7_uloga_zene: "", q8_seksisticki_komentari: "",
  q9_eu_clanstvo: "", q10_referendum_eu: "",
  q11_sloboda_govora: "", q12_regulacija_mreza: "", q13_zabrana_mreza_maloletnici: "",
  q14_odlazak_razmisljanje: "", q15_odlazak_plan: "",
  q16_prava_manjina: "", q17_deljenje_stana: "", q18_prijatelj_isti_pol: "",
};

// ── Question types ─────────────────────────────────────────────────────────
export type ScaleQuestion = {
  kind: "scale";
  field: string;
  label: string;
  scaleLabels?: [string, string];
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
    type: "section", id: "intro-q", title: "Za početak",
    questions: [
      {
        field: "q0_promena_misljenja", kind: "choice",
        label: "Kada si poslednji put promenio/la mišljenje nakon razgovora sa nekim ko se sa tobom nije slagao?",
        options: ["Često mi se to dešava", "Ponekad", "Retko", "Nikada"],
      },
      {
        field: "q0_suprotan_stav", kind: "choice",
        label: "Zamisli da razgovaraš sa nekim ko ima potpuno suprotan stav o nekoj važnoj društvenoj temi. Šta bi najverovatnije uradio/la?",
        options: ["Pokušao/la bih da razumem njegov stav", "Branio/la bih svoj stav u raspravi", "Pokušao/la bih da promenim temu", "Izbegao/la bih razgovor"],
      },
    ],
  },
  {
    type: "section", id: "politika", title: "Politika i institucije",
    questions: [
      {
        field: "q1_protesti_srbija", kind: "choice",
        label: "Šta po tvom mišljenju najbolje opisuje proteste u Srbiji u poslednjih godinu dana?",
        options: ["Legitimno nezadovoljstvo građana", "Politička borba opozicije", "Kombinacija oba", "Nemam dovoljno informacija"],
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
    type: "section", id: "vrednosti", title: "Društvene vrednosti",
    questions: [
      {
        field: "q5_uloga_drzave", kind: "choice",
        label: "Koja tvrdnja ti je bliža?",
        options: ["Država treba da ima veću ulogu u očuvanju tradicionalnih vrednosti", "Država ne treba da se meša u lične izbore građana", "Nešto između"],
      },
      {
        field: "q6_otvorenost_promenama", kind: "scale",
        label: "Društvo u Srbiji bi trebalo da bude otvorenije za promene u tradicionalnim vrednostima i načinu života.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
    ],
  },
  {
    type: "section", id: "zene", title: "Položaj žena",
    questions: [
      {
        field: "q7_uloga_zene", kind: "scale",
        label: "Najvažnija uloga žene je da brine o domu i porodici.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
      {
        field: "q8_seksisticki_komentari", kind: "choice",
        label: "Koliko često primećuješ seksističke komentare ili šale u svakodnevnom životu?",
        options: ["Nikada", "Retko", "Ponekad", "Često"],
      },
    ],
  },
  {
    type: "section", id: "eu", title: "Evropska unija",
    questions: [
      {
        field: "q9_eu_clanstvo", kind: "scale",
        label: "Članstvo Srbije u Evropskoj uniji bi poboljšalo život mladih u Srbiji.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
      {
        field: "q10_referendum_eu", kind: "choice",
        label: "Ako bi se sutra održao referendum o ulasku Srbije u EU, kako bi glasao/la?",
        options: ["Glasao/la bih za ulazak", "Glasao/la bih protiv", "Ne bih izašao/la na referendum", "Nisam siguran/na"],
      },
    ],
  },
  {
    type: "section", id: "sloboda", title: "Sloboda govora",
    questions: [
      {
        field: "q11_sloboda_govora", kind: "scale",
        label: "U Srbiji ljudi mogu slobodno da izražavaju mišljenje bez straha od posledica.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
      {
        field: "q12_regulacija_mreza", kind: "scale",
        label: "Država bi trebalo više da reguliše sadržaj na društvenim mrežama kako bi zaštitila mlade.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
      {
        field: "q13_zabrana_mreza_maloletnici", kind: "choice",
        label: "Da li bi podržao/la zabranu društvenih mreža za maloletnike?",
        options: ["Da", "Ne", "Nisam siguran/na"],
      },
    ],
  },
  {
    type: "section", id: "odlazak", title: "Odlazak mladih",
    questions: [
      {
        field: "q14_odlazak_razmisljanje", kind: "choice",
        label: "Koliko često razmišljaš o odlasku iz Srbije?",
        options: ["Nikada", "Povremeno", "Često", "Planiram odlazak"],
      },
      {
        field: "q15_odlazak_plan", kind: "scale",
        label: "Planiram da odem iz Srbije u narednih 5 godina.",
        scaleLabels: ["Uopšte se ne slažem", "Potpuno se slažem"],
      },
    ],
  },
  {
    type: "section", id: "manjine", title: "Manjinska prava",
    questions: [
      {
        field: "q16_prava_manjina", kind: "scale",
        label: "Da li pripadnici manjinskih grupa u Srbiji imaju ista prava kao i ostali?",
        scaleLabels: ["Uopšte nemaju", "U potpunosti imaju"],
      },
      {
        field: "q17_deljenje_stana", kind: "scale",
        label: "Koliko bi Vam bilo prijatno da delite stan sa osobom koja je druge nacionalnosti (npr. Rom, Albanac, Bošnjak)?",
        scaleLabels: ["Veoma neprijatno", "Veoma prijatno"],
      },
      {
        field: "q18_prijatelj_isti_pol", kind: "scale",
        label: "Kako biste se osećali kada bi neko od vaših bliskih prijatelja bio u vezi sa osobom istog pola?",
        scaleLabels: ["Veoma neprijatno", "Veoma prijatno"],
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