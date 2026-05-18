"use client";

import { useState, useCallback, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Participant {
  ime: string;
  prezime: string;
  email: string;
  telefon: string;
  godine: string;
  grad: string;
  datum: string;
  // Opinion fields
  q0_promena_misljenja: string;
  q2_institucije_interes: string;
  q3_veze_vs_obrazovanje: string;
  q4_protesti_generalno: string;
  q6_otvorenost_promenama: string;
  q8_seksisticki_komentari: string;
  q9_eu_clanstvo: string;
  q11_sloboda_govora: string;
  q13_zabrana_mreza_maloletnici: string;
  q14_odlazak_razmisljanje: string;
  q11_razlicitost: string;
  // Demographics
  pol: string;
  obrazovanje: string;
  mesto: string;
}

interface Pair {
  a: Participant;
  b: Participant;
  score: number; // 0–100, higher = more opposite
  breakdown: { label: string; diff: number; aVal: number; bVal: number }[];
}

// ── Scoring helpers ────────────────────────────────────────────────────────

const QUESTION_LABELS: Record<string, string> = {
  q0_promena_misljenja: "Promena mišljenja",
  q2_institucije_interes: "Poverenje u institucije",
  q3_veze_vs_obrazovanje: "Veze vs. obrazovanje",
  q4_protesti_generalno: "Stav o protestima",
  q6_otvorenost_promenama: "Otvorenost promenama",
  q8_seksisticki_komentari: "Seksistički komentari",
  q9_eu_clanstvo: "EU članstvo",
  q11_sloboda_govora: "Sloboda govora",
  q13_zabrana_mreza_maloletnici: "Zabrana mreža maloletnicima",
  q14_odlazak_razmisljanje: "Razmišljanje o odlasku",
  q11_razlicitost: "Prihvatanje različitosti",
};

// Map each answer to a 0–1 numeric value
function toNumeric(field: string, raw: string): number | null {
  if (!raw || raw.trim() === "") return null;

  const trimmed = raw.trim();

  // Already a number (scale questions 1–5)
  const asNum = Number(trimmed);
  if (!isNaN(asNum) && asNum >= 1 && asNum <= 5) return (asNum - 1) / 4;

  // Choice mappings
  const maps: Record<string, Record<string, number>> = {
    q0_promena_misljenja: {
      "Često mi se to dešava": 0,
      Ponekad: 0.33,
      Retko: 0.67,
      Nikada: 1,
    },
    q8_seksisticki_komentari: {
      Nikada: 0,
      Retko: 0.33,
      Ponekad: 0.67,
      Često: 1,
    },
    q13_zabrana_mreza_maloletnici: {
      Da: 0,
      "Nisam siguran/na": 0.5,
      Ne: 1,
    },
    q14_odlazak_razmisljanje: {
      Nikada: 0,
      Povremeno: 0.33,
      Često: 0.67,
      "Planiram odlazak": 1,
    },
  };

  if (maps[field]) {
    const val = maps[field][trimmed];
    return val !== undefined ? val : null;
  }

  return null;
}

const OPINION_FIELDS = [
  "q0_promena_misljenja",
  "q2_institucije_interes",
  "q3_veze_vs_obrazovanje",
  "q4_protesti_generalno",
  "q6_otvorenost_promenama",
  "q8_seksisticki_komentari",
  "q9_eu_clanstvo",
  "q11_sloboda_govora",
  "q13_zabrana_mreza_maloletnici",
  "q14_odlazak_razmisljanje",
  "q11_razlicitost",
];

function computeDistance(
  a: Participant,
  b: Participant,
): { score: number; breakdown: Pair["breakdown"] } {
  let sumSqDiff = 0;
  let count = 0;
  const breakdown: Pair["breakdown"] = [];

  for (const field of OPINION_FIELDS) {
    const aRaw = a[field as keyof Participant] as string;
    const bRaw = b[field as keyof Participant] as string;
    const aVal = toNumeric(field, aRaw);
    const bVal = toNumeric(field, bRaw);

    if (aVal === null || bVal === null) continue;

    const diff = Math.abs(aVal - bVal);
    sumSqDiff += diff * diff;
    count++;

    breakdown.push({
      label: QUESTION_LABELS[field] ?? field,
      diff: Math.round(diff * 100),
      aVal: Math.round(aVal * 100),
      bVal: Math.round(bVal * 100),
    });
  }

  if (count === 0) return { score: 0, breakdown: [] };

  // Euclidean distance normalized to 0–1 then to 0–100
  const euclidean = Math.sqrt(sumSqDiff / count);
  const score = Math.round(euclidean * 100);

  return { score, breakdown };
}

// Greedy matching: sort all possible pairs by score desc, greedily pick non-overlapping
function computePairings(participants: Participant[]): {
  pairs: Pair[];
  unmatched: Participant | null;
} {
  const n = participants.length;
  if (n < 2) return { pairs: [], unmatched: participants[0] ?? null };

  // Build all possible pairs
  type CandidatePair = {
    i: number;
    j: number;
    score: number;
    breakdown: Pair["breakdown"];
  };
  const candidates: CandidatePair[] = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const { score, breakdown } = computeDistance(
        participants[i],
        participants[j],
      );
      candidates.push({ i, j, score, breakdown });
    }
  }

  // Sort by score descending (most opposite first)
  candidates.sort((a, b) => b.score - a.score);

  const used = new Set<number>();
  const pairs: Pair[] = [];

  for (const c of candidates) {
    if (used.has(c.i) || used.has(c.j)) continue;
    used.add(c.i);
    used.add(c.j);
    pairs.push({
      a: participants[c.i],
      b: participants[c.j],
      score: c.score,
      breakdown: c.breakdown,
    });
  }

  // Sort final pairs by score desc
  pairs.sort((a, b) => b.score - a.score);

  const unmatchedIdx = [...Array(n).keys()].find((i) => !used.has(i));
  const unmatched =
    unmatchedIdx !== undefined ? participants[unmatchedIdx] : null;

  return { pairs, unmatched };
}

// ── CSV parser ─────────────────────────────────────────────────────────────

function parseCSV(text: string): Participant[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().replace(/^"|"$/g, ""));

  // Map sheet column names → FormData field names
  const COL_MAP: Record<string, keyof Participant> = {
    Ime: "ime",
    Prezime: "prezime",
    Email: "email",
    Telefon: "telefon",
    Godine: "godine",
    Grad: "grad",
    Datum: "datum",
    Q1_Promena_misljenja: "q0_promena_misljenja",
    Q2_Institucije: "q2_institucije_interes",
    Q3_Veze_vs_obrazovanje: "q3_veze_vs_obrazovanje",
    Q4_Protesti: "q4_protesti_generalno",
    Q5_Otvorenost_promenama: "q6_otvorenost_promenama",
    Q6_Seksisticki_komentari: "q8_seksisticki_komentari",
    Q7_EU_clanstvo: "q9_eu_clanstvo",
    Q8_Sloboda_govora: "q11_sloboda_govora",
    Q9_Zabrana_maloletnici: "q13_zabrana_mreza_maloletnici",
    Q10_Odlazak: "q14_odlazak_razmisljanje",
    Q11_Razlicitost: "q11_razlicitost",
    Pol: "pol",
    Obrazovanje: "obrazovanje",
    Mesto: "mesto",
  };

  const participants: Participant[] = [];

  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim()) continue;

    // Handle quoted fields with commas inside
    const values: string[] = [];
    let inQuote = false;
    let current = "";
    for (const ch of raw) {
      if (ch === '"') {
        inQuote = !inQuote;
        continue;
      }
      if (ch === "," && !inQuote) {
        values.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    values.push(current.trim());

    const row: Partial<Participant> = {
      ime: "",
      prezime: "",
      email: "",
      telefon: "",
      godine: "",
      grad: "",
      datum: "",
      pol: "",
      obrazovanje: "",
      mesto: "",
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

    headers.forEach((h, idx) => {
      const field = COL_MAP[h];
      if (field) row[field] = values[idx] ?? "";
    });

    // Only include if they have a name
    if (row.ime || row.prezime) participants.push(row as Participant);
  }

  return participants;
}

// ── Score color ────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 70) return "#16a34a";
  if (score >= 45) return "#d97706";
  return "#dc2626";
}

function scoreLabel(score: number): string {
  if (score >= 70) return "Odličan par";
  if (score >= 45) return "Dobar par";
  return "Slab par";
}

// ── Main component ─────────────────────────────────────────────────────────

export default function PairingTool() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [unmatched, setUnmatched] = useState<Participant | null>(null);
  const [expandedPair, setExpandedPair] = useState<number | null>(null);
  const [stage, setStage] = useState<"idle" | "loaded" | "paired">("idle");
  const [dragOver, setDragOver] = useState(false);
  const [filterDatum, setFilterDatum] = useState<string>("all");
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setParticipants(parsed);
      setPairs([]);
      setUnmatched(null);
      setExpandedPair(null);
      setFilterDatum("all");
      setStage(parsed.length > 0 ? "loaded" : "idle");
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function runMatching() {
    const pool =
      filterDatum === "all"
        ? participants
        : participants.filter((p) => p.datum === filterDatum);
    const { pairs: newPairs, unmatched: newUnmatched } = computePairings(pool);
    setPairs(newPairs);
    setUnmatched(newUnmatched);
    setExpandedPair(null);
    setStage("paired");
  }

  function exportCSV() {
    const rows = [
      [
        "Ime A",
        "Prezime A",
        "Email A",
        "Ime B",
        "Prezime B",
        "Email B",
        "Skor poklapanja (%)",
      ],
      ...pairs.map((p) => [
        p.a.ime,
        p.a.prezime,
        p.a.email,
        p.b.ime,
        p.b.prezime,
        p.b.email,
        String(p.score),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "parovi.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const uniqueDates = [
    ...new Set(participants.map((p) => p.datum).filter(Boolean)),
  ].sort();

  const filteredParticipants =
    filterDatum === "all"
      ? participants
      : participants.filter((p) => p.datum === filterDatum);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .pt-root {
          font-family: 'DM Sans', sans-serif;
          background: #0f0f0f;
          min-height: 100vh;
          color: #f0ede8;
          padding: 48px 32px;
        }

        .pt-header {
          max-width: 900px;
          margin: 0 auto 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .pt-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #f0ede8;
        }

        .pt-title span {
          color: #f97316;
        }

        .pt-subtitle {
          font-size: 0.9rem;
          color: #888;
          margin-top: 8px;
          line-height: 1.6;
        }

        .pt-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #888;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .pt-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f97316;
        }

        /* ── Drop zone ── */
        .pt-dropzone {
          max-width: 900px;
          margin: 0 auto 32px;
          border: 2px dashed #2a2a2a;
          border-radius: 20px;
          padding: 56px 32px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: #141414;
        }

        .pt-dropzone:hover,
        .pt-dropzone.drag-over {
          border-color: #f97316;
          background: #1a1208;
        }

        .pt-dropzone-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .pt-dropzone-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .pt-dropzone-sub {
          font-size: 0.85rem;
          color: #666;
        }

        .pt-browse {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 24px;
          background: #f97316;
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 999px;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
          border: none;
        }

        .pt-browse:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* ── Controls ── */
        .pt-controls {
          max-width: 900px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pt-stat {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #aaa;
        }

        .pt-stat strong {
          color: #f0ede8;
          font-family: 'Syne', sans-serif;
        }

        .pt-filter-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }

        .pt-filter-label {
          font-size: 0.8rem;
          color: #666;
          white-space: nowrap;
        }

        .pt-select {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          padding: 8px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: #f0ede8;
          cursor: pointer;
          outline: none;
        }

        .pt-select:focus {
          border-color: #f97316;
        }

        .pt-btn-match {
          background: #f97316;
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 12px 28px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
          white-space: nowrap;
        }

        .pt-btn-match:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .pt-btn-export {
          background: transparent;
          color: #f0ede8;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 10px 22px;
          border: 1px solid #2a2a2a;
          border-radius: 999px;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          white-space: nowrap;
        }

        .pt-btn-export:hover {
          border-color: #f97316;
          background: #1a1208;
        }

        /* ── Results header ── */
        .pt-results-header {
          max-width: 900px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pt-results-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Pair card ── */
        .pt-pairs {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pt-pair {
          background: #141414;
          border: 1px solid #222;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.15s;
        }

        .pt-pair:hover {
          border-color: #333;
        }

        .pt-pair-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          cursor: pointer;
        }

        .pt-person {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .pt-person-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #f0ede8;
        }

        .pt-person-meta {
          font-size: 0.78rem;
          color: #555;
        }

        .pt-vs {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.75rem;
          color: #333;
          letter-spacing: 0.1em;
        }

        .pt-score-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: #1a1a1a;
          border-radius: 12px;
          padding: 10px 18px;
          min-width: 80px;
        }

        .pt-score-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          line-height: 1;
        }

        .pt-score-lbl {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #555;
        }

        .pt-chevron {
          font-size: 0.75rem;
          color: #444;
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          padding: 4px;
        }

        .pt-chevron.open {
          transform: rotate(180deg);
        }

        /* ── Breakdown ── */
        .pt-breakdown {
          border-top: 1px solid #1e1e1e;
          padding: 20px 24px;
        }

        .pt-breakdown-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }

        .pt-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pt-breakdown-row {
          display: grid;
          grid-template-columns: 140px 1fr 36px;
          align-items: center;
          gap: 12px;
        }

        .pt-br-label {
          font-size: 0.78rem;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pt-br-bar-wrap {
          position: relative;
          height: 8px;
          background: #1e1e1e;
          border-radius: 999px;
          overflow: visible;
        }

        .pt-br-dot {
          position: absolute;
          top: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid #0f0f0f;
        }

        .pt-br-dot-a { background: #60a5fa; }
        .pt-br-dot-b { background: #f97316; }

        .pt-br-diff {
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          color: #555;
          text-align: right;
        }

        .pt-legend {
          display: flex;
          gap: 16px;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #1e1e1e;
        }

        .pt-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: #666;
        }

        .pt-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* ── Unmatched ── */
        .pt-unmatched {
          max-width: 900px;
          margin: 20px auto 0;
          background: #141414;
          border: 1px dashed #2a2a2a;
          border-radius: 16px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pt-unmatched-label {
          font-size: 0.78rem;
          color: #555;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .pt-unmatched-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #f0ede8;
        }

        .pt-unmatched-meta {
          font-size: 0.78rem;
          color: #555;
        }

        /* ── Empty / idle ── */
        .pt-empty {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          padding: 60px 20px;
          color: #444;
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          .pt-root { padding: 32px 16px; }
          .pt-pair-header {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
          }
          .pt-vs { display: none; }
          .pt-breakdown-row { grid-template-columns: 100px 1fr 32px; }
        }
      `}</style>

      <div className="pt-root">
        {/* Header */}
        <div className="pt-header">
          <div>
            <div className="pt-badge">
              <div className="pt-badge-dot" />
              Admin · Parovi
            </div>
            <h1 className="pt-title">
              Matching
              <br />
              <span>Engine</span>
            </h1>
            <p className="pt-subtitle">
              Uvezi sheet, izaberi termin, generiši parove suprotnih mišljenja.
            </p>
          </div>
        </div>

        {/* Drop zone */}
        <div
          className={`pt-dropzone${dragOver ? " drag-over" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
          <div className="pt-dropzone-icon">📂</div>
          <div className="pt-dropzone-title">
            {stage === "idle"
              ? "Prevuci CSV ili klikni da uvezuješ"
              : `✓ Učitano ${participants.length} prijava`}
          </div>
          <div className="pt-dropzone-sub">
            {stage === "idle"
              ? "Eksportuj Google Sheet kao .csv, pa uvezi ovde"
              : "Klikni ponovo da zamenjiš fajl"}
          </div>
          {stage === "idle" && (
            <button className="pt-browse" type="button">
              Izaberi fajl
            </button>
          )}
        </div>

        {/* Controls */}
        {stage !== "idle" && (
          <div className="pt-controls">
            <div className="pt-stat">
              <strong>{filteredParticipants.length}</strong> prijava
            </div>
            {uniqueDates.length > 1 && (
              <div className="pt-filter-wrap">
                <span className="pt-filter-label">Termin:</span>
                <select
                  className="pt-select"
                  value={filterDatum}
                  onChange={(e) => setFilterDatum(e.target.value)}
                >
                  <option value="all">Svi termini</option>
                  {uniqueDates.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button className="pt-btn-match" onClick={runMatching}>
              ⚡ Generiši parove
            </button>
            {stage === "paired" && pairs.length > 0 && (
              <button className="pt-btn-export" onClick={exportCSV}>
                ↓ Eksportuj CSV
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {stage === "paired" && (
          <>
            <div className="pt-results-header">
              <span className="pt-results-title">
                {pairs.length} {pairs.length === 1 ? "par" : "parova"} ·
                sortirano po konfliktnosti
              </span>
            </div>

            <div className="pt-pairs">
              {pairs.map((pair, idx) => (
                <div className="pt-pair" key={idx}>
                  <div
                    className="pt-pair-header"
                    onClick={() =>
                      setExpandedPair(expandedPair === idx ? null : idx)
                    }
                  >
                    {/* Person A */}
                    <div className="pt-person">
                      <div className="pt-person-name">
                        {pair.a.ime} {pair.a.prezime}
                      </div>
                      <div className="pt-person-meta">
                        {pair.a.email}
                        {pair.a.godine ? ` · ${pair.a.godine}g` : ""}
                      </div>
                    </div>

                    <div className="pt-vs">VS</div>

                    {/* Person B */}
                    <div className="pt-person">
                      <div className="pt-person-name">
                        {pair.b.ime} {pair.b.prezime}
                      </div>
                      <div className="pt-person-meta">
                        {pair.b.email}
                        {pair.b.godine ? ` · ${pair.b.godine}g` : ""}
                      </div>
                    </div>

                    {/* Score */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div className="pt-score-pill">
                        <span
                          className="pt-score-num"
                          style={{ color: scoreColor(pair.score) }}
                        >
                          {pair.score}
                        </span>
                        <span className="pt-score-lbl">
                          {scoreLabel(pair.score)}
                        </span>
                      </div>
                      <div
                        className={`pt-chevron${expandedPair === idx ? " open" : ""}`}
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  {expandedPair === idx && (
                    <div className="pt-breakdown">
                      <div className="pt-breakdown-title">
                        Razlika po pitanjima
                      </div>
                      <div className="pt-breakdown-list">
                        {pair.breakdown
                          .sort((a, b) => b.diff - a.diff)
                          .map((row, ri) => (
                            <div className="pt-breakdown-row" key={ri}>
                              <div className="pt-br-label">{row.label}</div>
                              <div className="pt-br-bar-wrap">
                                <div
                                  className="pt-br-dot pt-br-dot-a"
                                  style={{ left: `${row.aVal}%` }}
                                  title={`${pair.a.ime}: ${row.aVal}`}
                                />
                                <div
                                  className="pt-br-dot pt-br-dot-b"
                                  style={{ left: `${row.bVal}%` }}
                                  title={`${pair.b.ime}: ${row.bVal}`}
                                />
                              </div>
                              <div className="pt-br-diff">{row.diff}%</div>
                            </div>
                          ))}
                      </div>
                      <div className="pt-legend">
                        <div className="pt-legend-item">
                          <div
                            className="pt-legend-dot"
                            style={{ background: "#60a5fa" }}
                          />
                          {pair.a.ime} {pair.a.prezime}
                        </div>
                        <div className="pt-legend-item">
                          <div
                            className="pt-legend-dot"
                            style={{ background: "#f97316" }}
                          />
                          {pair.b.ime} {pair.b.prezime}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Unmatched */}
            {unmatched && (
              <div className="pt-unmatched">
                <span className="pt-unmatched-label">Neparovan</span>
                <div>
                  <div className="pt-unmatched-name">
                    {unmatched.ime} {unmatched.prezime}
                  </div>
                  <div className="pt-unmatched-meta">
                    {unmatched.email}
                    {unmatched.datum ? ` · ${unmatched.datum}` : ""}
                  </div>
                </div>
              </div>
            )}

            {pairs.length === 0 && (
              <div className="pt-empty">
                Nema dovoljno prijava za odabrani termin.
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
