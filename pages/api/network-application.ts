import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  ok: true;
};

const REQUIRED_ENV_VARS = [
  "GOOGLE_SHEET_ID",
  "GOOGLE_SHEET_TAB",
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
] as const;

const getMissingEnvVars = () =>
  REQUIRED_ENV_VARS.filter((envVar) => !process.env[envVar]?.trim());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const missingEnvVars = getMissingEnvVars();

  if (missingEnvVars.length > 0) {
    return res.status(500).json({ error: "Server configuration is incomplete." });
  }

  const telegram =
    typeof req.body?.telegram === "string" ? req.body.telegram.trim() : "";
  const xUsername =
    typeof req.body?.twitter === "string" ? req.body.twitter.trim() : "";
  const wallet =
    typeof req.body?.wallet === "string" ? req.body.wallet.trim() : "";
  const twitterFollow = req.body?.twitterFollow === true;

  if (!telegram || !xUsername || !wallet || !twitterFollow) {
    return res.status(400).json({ error: "Invalid application payload." });
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${process.env.GOOGLE_SHEET_TAB}!A:C`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[telegram, xUsername, wallet]],
      },
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to append network application", error);
    return res.status(500).json({ error: "Failed to save application." });
  }
}
