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
        { error: "Email authentication failed" },
        { status: 500 }
      );
    }

    // Step 2: Retrieve the Zoho Mail account ID
    // const accountRes = await fetch("https://mail.zoho.com/api/accounts", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Zoho-oauthtoken ${accessToken}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (!accountRes.ok) {
    //   return NextResponse.json(
    //     { error: "Failed to retrieve account information." },
    //     { status: 500 }
    //   );
    // }

    // const accountData = await accountRes.json();

    const accountId = process.env.ZOHO_ACCOUNT_ID;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
    h2 { color: #333; text-align: center; }
    .content { padding: 10px 20px; font-size: 16px; color: #555; line-height: 1.6; }
    .info { margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-radius: 5px; }
    .info strong { color: #333; font-size: 14px; }
    .footer { text-align: center; font-size: 14px; color: #888; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; }
    @media (max-width: 600px) { .container { width: 90%; padding: 15px; } }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Contact Form Submission</h2>
    <div class="content">
      <p>Hello,</p>
      <p>You have received a new message from the contact form:</p>
      <div class="info">
        <strong>Name:</strong>
        <p>${name}</p>
      </div>
      <div class="info">
        <strong>Email:</strong>
        <p>${email}</p>
      </div>
      <div class="info">
        <strong>Message:</strong>
        <p>${message}</p>
      </div>
      <p>Thank you.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 avizitRX. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`;

    // Step 3: Send email via Zoho Mail API
    const emailRes = await fetch(
      `https://mail.zoho.com/api/accounts/${accountId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fromAddress: process.env.ZOHO_MAIL_FROM,
          toAddress: process.env.ZOHO_MAIL_TO,
          subject: `New Contact: ${email}`,
          content: emailHtml,
          mailFormat: "html",
        }),
      }
    );

    if (!emailRes.ok) {
      const errorData = await emailRes.json();

      return NextResponse.json(
        { error: `Email sending failed: ${errorData[0].msg}` },
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
