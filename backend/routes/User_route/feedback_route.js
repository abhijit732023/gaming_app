// routes/feedbackRoutes.js
import express from "express";
import nodemailer from "nodemailer";
import config from "../../config/config.js";

const Feedback_Route = express.Router();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email_user,
    pass: config.email_password,
  },
});

// POST /api/feedback
Feedback_Route.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Feedback received:", { name, email, message });

  try {
    await transporter.sendMail({
      from: email, // User's email address as the sender
      to: config.email_user, // YOUR email address to receive feedback
      replyTo: email, // User's email if you want to reply easily
      subject: `New Feedback Received from ${name}`,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("Error sending feedback email:", error);
    res.status(500).json({ message: "Failed to send feedback." });
  }
});

export default Feedback_Route;
