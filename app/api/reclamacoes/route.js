import { google } from "googleapis";
import { NextResponse } from "next/server";

// Credenciais da conta de serviço
const credentials = {
  type: "service_account",
  project_id: "crm-integracao",
  private_key_id: "PRIVATE_KEY_ID",
  private_key: `PRIVATE_KEY_CONTENT`,
  client_email: "YOUR_SERVICE_ACCOUNT_EMAIL",
  client_id: "CLIENT_ID",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "CERT_URL"
};

// ID da planilha e nome da aba
const SHEET_ID = "1_YPf3UQugEZVlTXgXYkaXPoGzBZbPRTACxZwYHjBAiY";
const SHEET_NAME = "COPIA";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: SHEET_NAME,
    });

    const [header, ...rows] = response.data.values;
    const data = rows.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i] || "";
      });
      return obj;
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
