import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, email, assunto, mensagem } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: process.env.SHEET_NAME + "!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[nome, email, assunto, mensagem]],
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Erro ao salvar no Google Sheets:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}