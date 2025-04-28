import express from "express";
import nodemailer from "nodemailer";
import config from "../../config/config.js";

const AdminEmailSend = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${config.email_user}`, // <-- Your email address
    pass: `${config.email_password}`, // <-- Your app password
  },
});

// POST /email
AdminEmailSend.post('/', async (req, res) => {
  const { subject, message, email } = req.body;
  console.log("Request received to send email with subject:", subject);

  try {
    for (const receiver of email) {
      await transporter.sendMail({
        from: `"Team BattleHub" ${config.email_user}`, // Sender name looks clean
        to: receiver,
        subject: subject,
        text: message, // Plain text version
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hello Gamer!</h2>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <br>
            <p style="font-size: 12px; color: #777;">If you did not register for the tournament, please ignore this email.</p>
          </div>
        `,
      });
    }

    res.status(200).json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
});

export default AdminEmailSend;
