// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const COMPANY_EMAIL = "nbstechsolutions3@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 5 characters." },
        { status: 400 }
      );
    }

    const clientName = name.trim();
    const clientEmail = email.trim().toLowerCase();
    const clientPhone = phone && typeof phone === "string" ? phone.trim() : "Not provided";
    const selectedService = service || "General Technology Inquiry";
    const projectDetails = message.trim();
    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // Executive HTML Email Template for NBS Founders
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #05070d; color: #f5f7fa; margin: 0; padding: 24px; }
          .card { max-width: 600px; margin: 0 auto; background: #0b0f1a; border: 1px solid rgba(46, 107, 255, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
          .header { background: linear-gradient(135deg, #101628 0%, #172554 100%); padding: 28px 32px; border-bottom: 1px solid rgba(46, 107, 255, 0.2); }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 13px; color: #00d2ff; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }
          .content { padding: 32px; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(46, 107, 255, 0.15); border: 1px solid rgba(46, 107, 255, 0.4); border-radius: 9999px; font-size: 11px; font-weight: 600; color: #00d2ff; text-transform: uppercase; margin-bottom: 20px; }
          .field-group { margin-bottom: 20px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8b93a7; margin-bottom: 6px; font-weight: 600; }
          .field-value { font-size: 15px; color: #ffffff; font-weight: 500; }
          .field-value a { color: #2e6bff; text-decoration: none; font-weight: 600; }
          .field-value a:hover { text-decoration: underline; }
          .message-box { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 18px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
          .footer { padding: 20px 32px; background: #070a12; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; color: #64748b; text-align: center; }
          .cta-row { margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 12px; }
          .cta-btn { display: inline-block; padding: 10px 20px; background: #2e6bff; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>NBS TECH SOLUTIONS</h1>
            <p>New Project Lead &bull; Client Inquiry</p>
          </div>
          <div class="content">
            <div class="badge">🔥 New Direct Inquiry Received</div>
            
            <div class="field-group">
              <div class="field-label">Client Name</div>
              <div class="field-value">${clientName}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Client Email</div>
              <div class="field-value">
                <a href="mailto:${clientEmail}">${clientEmail}</a>
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Client Phone / Dial Pad</div>
              <div class="field-value">
                ${
                  clientPhone !== "Not provided"
                    ? `<a href="tel:${clientPhone.replace(/\s+/g, "")}">${clientPhone}</a>`
                    : `<span style="color: #64748b;">Not provided</span>`
                }
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Selected Domain / Service</div>
              <div class="field-value">${selectedService}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Inquiry & Project Description</div>
              <div class="message-box">${projectDetails}</div>
            </div>

            <div class="field-group" style="margin-top: 24px;">
              <div class="field-label">Received Timestamp (IST)</div>
              <div style="font-size: 13px; color: #8b93a7;">${submissionTime}</div>
            </div>

            <div class="cta-row">
              <a href="mailto:${clientEmail}?subject=Re:%20NBS%20Tech%20Solutions%20Inquiry%20-%20${encodeURIComponent(selectedService)}" class="cta-btn">
                Reply Directly to ${clientName}
              </a>
            </div>
          </div>
          <div class="footer">
            NBS Tech Solutions Automated Dispatch &bull; Lead Routing System
          </div>
        </div>
      </body>
      </html>
    `;

    const textEmail = `
New Project Inquiry Received - NBS TECH SOLUTIONS
--------------------------------------------------
Client Name: ${clientName}
Client Email: ${clientEmail}
Client Phone: ${clientPhone}
Service: ${selectedService}
Timestamp: ${submissionTime}

Project Description:
${projectDetails}

--------------------------------------------------
Reply directly to this email to respond to ${clientName} (${clientEmail}).
    `.trim();

    // Check if Gmail SMTP credentials or generic SMTP is configured in environment
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const gmailUser = process.env.GMAIL_USER || COMPANY_EMAIL;

    let emailSent = false;
    let dispatchMethod = "none";

    if (gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        await transporter.sendMail({
          from: `"NBS Leads" <${gmailUser}>`,
          to: COMPANY_EMAIL,
          replyTo: clientEmail,
          subject: `🔥 New Lead: ${clientName} — ${selectedService}`,
          text: textEmail,
          html: htmlEmail,
        });

        emailSent = true;
        dispatchMethod = "gmail_smtp";
      } catch (smtpErr) {
        console.error("Gmail SMTP dispatch failed:", smtpErr);
      }
    }

    // Secondary fallback: Web3Forms if access key is provided in environment
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!emailSent && web3formsKey) {
      try {
        const w3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: clientName,
            email: clientEmail,
            phone: clientPhone,
            subject: `🔥 New Lead: ${clientName} — ${selectedService}`,
            message: `${projectDetails}\n\nPhone: ${clientPhone}\nService: ${selectedService}`,
            from_name: "NBS Portfolio Lead",
          }),
        });

        if (w3Res.ok) {
          emailSent = true;
          dispatchMethod = "web3forms";
        }
      } catch (w3Err) {
        console.error("Web3Forms dispatch failed:", w3Err);
      }
    }

    // Always log lead details on the server so no lead is ever lost
    console.log("=== NEW NBS LEAD CAPTURED ===");
    console.log("Time:", submissionTime);
    console.log("Name:", clientName);
    console.log("Email:", clientEmail);
    console.log("Phone:", clientPhone);
    console.log("Service:", selectedService);
    console.log("Message:", projectDetails);
    console.log("Dispatch Method:", dispatchMethod);
    console.log("==============================");

    return NextResponse.json({
      success: true,
      delivered: emailSent,
      method: dispatchMethod,
      clientName,
      clientEmail,
      message: "Your project inquiry has been successfully dispatched to our founders.",
    });
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your inquiry." },
      { status: 500 }
    );
  }
}
