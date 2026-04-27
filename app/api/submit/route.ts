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

      // Intro questions
      q0_promena_misljenja,
      q0_suprotan_stav,

      // Section II — Politička orijentacija
      q1_protesti_srbija,
      q2_institucije_interes,
      q3_veze_vs_obrazovanje,
      q4_protesti_generalno,

      // Section III — Društvene vrednosti
      q5_uloga_drzave,
      q6_otvorenost_promenama,

      // Section IV — Položaj žena
      q7_uloga_zene,
      q8_seksisticki_komentari,

      // Section V — EU
      q9_eu_clanstvo,
      q10_referendum_eu,

      // Section VI — Sloboda govora
      q11_sloboda_govora,
      q12_regulacija_mreza,
      q13_zabrana_mreza_maloletnici,

      // Section VII — Odlazak mladih
      q14_odlazak_razmisljanje,
      q15_odlazak_plan,

      // Section VIII — Manjinska prava
      q16_prava_manjina,
      q17_deljenje_stana,
      q18_prijatelj_isti_pol,

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
      q0_suprotan_stav,

      q1_protesti_srbija,
      q2_institucije_interes,
      q3_veze_vs_obrazovanje,
      q4_protesti_generalno,

      q5_uloga_drzave,
      q6_otvorenost_promenama,

      q7_uloga_zene,
      q8_seksisticki_komentari,

      q9_eu_clanstvo,
      q10_referendum_eu,

      q11_sloboda_govora,
      q12_regulacija_mreza,
      q13_zabrana_mreza_maloletnici,

      q14_odlazak_razmisljanje,
      q15_odlazak_plan,

      q16_prava_manjina,
      q17_deljenje_stana,
      q18_prijatelj_isti_pol,

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
        "Q0_Promena_misljenja", "Q0_Suprotan_stav",
        "Q1_Protesti_opis", "Q2_Institucije", "Q3_Veze_vs_obrazovanje", "Q4_Protesti_stav",
        "Q5_Uloga_drzave", "Q6_Otvorenost_promenama",
        "Q7_Uloga_zene", "Q8_Seksisticki_komentari",
        "Q9_EU_clanstvo", "Q10_Referendum_EU",
        "Q11_Sloboda_govora", "Q12_Regulacija_mreza", "Q13_Zabrana_maloletnici",
        "Q14_Odlazak_razmisljanje", "Q15_Odlazak_plan",
        "Q16_Prava_manjina", "Q17_Deljenje_stana", "Q18_Prijatelj_isti_pol",
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
    { success: false, error: String(error) },  // ← this line
    { status: 500 }
  );
}
}