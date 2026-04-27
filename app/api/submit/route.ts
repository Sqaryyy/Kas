import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      // Step 1 — Registration
      ime,
      prezime,
      email,
      telefon,
      godine,
      grad,
      datum,

      // Q1 — Promena mišljenja
      q0_promena_misljenja,

      // Q2 — Institucije
      q2_institucije_interes,

      // Q3 — Veze vs obrazovanje
      q3_veze_vs_obrazovanje,

      // Q4 — Protesti
      q4_protesti_generalno,

      // Q5 — Otvorenost promenama
      q6_otvorenost_promenama,

      // Q6 — Seksistički komentari
      q8_seksisticki_komentari,

      // Q7 — EU članstvo
      q9_eu_clanstvo,

      // Q8 — Sloboda govora
      q11_sloboda_govora,

      // Q9 — Zabrana mreža maloletnici
      q13_zabrana_mreza_maloletnici,

      // Q10 — Odlazak
      q14_odlazak_razmisljanje,

      // Q11 — Različitost (merged minority/diversity question)
      q11_razlicitost,

      // Demografija
      pol,
      godine_grupa,
      obrazovanje,
      mesto,
    } = body;

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toLocaleString("sr-RS", {
      timeZone: "Europe/Belgrade",
    });

    const row = [
      timestamp,
      ime,
      prezime,
      email,
      telefon,
      godine,
      grad,
      datum,

      q0_promena_misljenja,
      q2_institucije_interes,
      q3_veze_vs_obrazovanje,
      q4_protesti_generalno,
      q6_otvorenost_promenama,
      q8_seksisticki_komentari,
      q9_eu_clanstvo,
      q11_sloboda_govora,
      q13_zabrana_mreza_maloletnici,
      q14_odlazak_razmisljanje,
      q11_razlicitost,

      pol,
      godine_grupa,
      obrazovanje,
      mesto,
    ];

    // Check if sheet is empty and write headers if so
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "Sheet1!A1",
    });

    if (!existing.data.values || existing.data.values.length === 0) {
      const headers = [
        "Timestamp", "Ime", "Prezime", "Email", "Telefon", "Godine", "Grad", "Datum",
        "Q1_Promena_misljenja",
        "Q2_Institucije",
        "Q3_Veze_vs_obrazovanje",
        "Q4_Protesti",
        "Q5_Otvorenost_promenama",
        "Q6_Seksisticki_komentari",
        "Q7_EU_clanstvo",
        "Q8_Sloboda_govora",
        "Q9_Zabrana_maloletnici",
        "Q10_Odlazak",
        "Q11_Razlicitost",
        "Pol", "Godine_grupa", "Obrazovanje", "Mesto",
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [headers] },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sheets API error:", error);
    return NextResponse.json(
      { success: false, error: "Greška pri čuvanju podataka." },
      { status: 500 }
    );
  }
}