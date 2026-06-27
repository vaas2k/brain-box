// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, organization, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to the company
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Brainbox Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'niaz@brainbox.com.pk',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #1A3C2E; border-bottom: 2px solid #C0392B; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <p><strong>Message:</strong></p>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This message was sent from the Brainbox Syndicate website contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        --------------------------
        Name: ${name}
        Organization: ${organization || 'N/A'}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        This message was sent from the Brainbox Syndicate website contact form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Auto-reply to the sender
    const replyOptions = {
      from: process.env.SMTP_FROM || `"Brainbox Syndicate" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting Brainbox Syndicate`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #1A3C2E;">Thank You for Reaching Out!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p>Dear ${name},</p>
            <p>Thank you for contacting Brainbox Syndicate. We have received your message and will get back to you within 2-3 business days.</p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 15px;">
              <strong>Your message summary:</strong><br />
              Subject: ${subject}<br />
              Message: ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
            </p>
            <p style="margin-top: 20px;">
              In the meantime, feel free to explore our <a href="https://brainbox.com.pk/portfolio" style="color: #C0392B;">portfolio</a> 
              or learn more about our <a href="https://brainbox.com.pk/services" style="color: #C0392B;">services</a>.
            </p>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            Best regards,<br />
            <strong style="color: #1A3C2E;">Brainbox Syndicate Team</strong><br />
            <span style="color: #999;">+92 (51) 8445007</span>
          </p>
        </div>
      `,
      text: `
        Thank You for Reaching Out!
        ----------------------------
        Dear ${name},
        
        Thank you for contacting Brainbox Syndicate. We have received your message and will get back to you within 2-3 business days.
        
        Your message summary:
        Subject: ${subject}
        Message: ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
        
        In the meantime, feel free to explore our portfolio at brainbox.com.pk/portfolio or learn more about our services at brainbox.com.pk/services.
        
        Best regards,
        Brainbox Syndicate Team
        +92 (51) 8445007
      `,
    };

    await transporter.sendMail(replyOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}