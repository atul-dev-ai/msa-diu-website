import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const data = await resend.emails.send({
      from: "MSA Admin <onboarding@resend.dev>", // Resend-এ ডোমেইন ভেরিফাই না করা পর্যন্ত এটিই রাখতে হবে
      to: ["atul11tem@gmail.com"], // এখানে আপনাদের যেই ইমেইলে নোটিফিকেশন পেতে চান সেটি দিন
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">New Message via MSA-DIU Website</h2>
          <p>You have received a new message from the contact form.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">
            ${message}
          </div>
          <br/>
          <p style="font-size: 12px; color: #64748b;">This is an automated email from the MSA-DIU website system.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
