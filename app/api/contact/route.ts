import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, honeypot } = body;

    // Honeypot Check (Bot Prevention)
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

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

    if (!accessToken) {
      return NextResponse.json(
        { error: "Zoho authentication failed" },
        { status: 500 }
      );
    }

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
          subject: `New Contact: ${email}`,
          content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        }),
      }
    );

    if (!emailRes.ok) {
      return NextResponse.json(
        { error: "Email sending failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
