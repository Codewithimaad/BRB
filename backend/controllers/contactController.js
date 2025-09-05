import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendContactForm = async (req, res) => {
  try {
    const { name, email, company, phone, service, budget, timeline, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL,
      subject: `New Consultation Request from ${name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; background-color: #0f172a; padding: 20px; color: #e2e8f0;">
          <!-- Main Content Card -->
          <div style="max-width: 600px; margin: auto; background: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 15px rgba(0,0,0,0.25); border: 1px solid #334155;">
            
            <!-- Header Section with Green Gradient -->
            <div style="background: linear-gradient(to right, #22c55e, #16a34a); padding: 24px; text-align: center;">
              <h2 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">New Consultation Request</h2>
            </div>
            
            <!-- Body Content -->
            <div style="padding: 24px; line-height: 1.6;">
              <p style="font-size: 16px; color: #cbd5e1; margin-bottom: 20px;">You've received a new consultation request with the following details:</p>
              
              <!-- Divider -->
              <div style="height: 1px; background: linear-gradient(to right, transparent, #4ade80, transparent); margin: 24px 0;"></div>

              <!-- Information Table -->
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #94a3b8; width: 120px;">Name:</td>
                  <td style="padding: 12px 0; color: #e2e8f0; word-break: break-word;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #94a3b8;">Email:</td>
                  <td style="padding: 12px 0; color: #e2e8f0; word-break: break-word;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #94a3b8;">Company:</td>
                  <td style="padding: 12px 0; color: #e2e8f0; word-break: break-word;">${company || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #94a3b8;">Phone:</td>
                  <td style="padding: 12px 0; color: #e2e8f0; word-break: break-word;">${phone || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #94a3b8;">Service:</td>
                  <td style="padding: 12px 0; color: #e2e8f0; word-break: break-word;">${service || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #94a3b8;">Budget:</td>
                  <td style="padding: 12px 0; color: #e2e8f0; word-break: break-word;">${budget || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #94a3b8;">Timeline:</td>
                  <td style="padding: 12px 0; color: #e2e8f0; word-break: break-word;">${timeline || "N/A"}</td>
                </tr>
              </table>
              
              <!-- Divider -->
              <div style="height: 1px; background: linear-gradient(to right, transparent, #4ade80, transparent); margin: 24px 0;"></div>
              
              <p style="font-weight: bold; font-size: 16px; color: #94a3b8; margin-bottom: 8px;">Message:</p>
              <p style="color: #e2e8f0; white-space: pre-wrap; word-break: break-word;">${message}</p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #111827; padding: 20px; text-align: center; font-size: 12px; color: #4b5563; border-top: 1px solid #334155;">
              <p style="margin: 0;">This email was sent from your website's contact form.</p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
};
