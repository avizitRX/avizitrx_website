import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Allow 5 requests per IP per minute
  message: { error: "Too many requests, please try again later." },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apply rate limiting
  await new Promise((resolve, reject) => {
    limiter(req as any, res as any, (result: any) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { name, email, subject, message, honeypot } = req.body;

  // Honeypot Check (Bot Prevention)
  if (honeypot) return res.status(400).json({ error: "Spam detected" });

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Step 1: Get a new access token from Zoho
    const tokenRes = await fetch("https://accounts.zoho.com/oauth/v2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        grant_type: "refresh_token",
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken)
      return res.status(500).json({ error: "Zoho authentication failed" });

    // Step 2: Send email via Zoho Mail API
    const emailRes = await fetch(
      "https://mail.zoho.com/api/accounts/me/messages",
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromAddress: process.env.ZOHO_MAIL_FROM,
          toAddress: process.env.ZOHO_MAIL_TO,
          subject: `New Contact: ${subject}`,
          content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        }),
      }
    );

    if (!emailRes.ok)
      return res.status(500).json({ error: "Email sending failed" });

    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
}
