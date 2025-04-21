import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { config,Slot_regi } from '../../index.js';

const PaymentRouter = express.Router();

const razorpay = new Razorpay({
  key_id: config.payment_key_id,
  key_secret: config.payment_key_secret,
});

// Payment request route
PaymentRouter.post("/request", async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert ₹ to paise
      currency: "INR",
      payment_capture: 1
    });
    console.log("Order Created:", order);
    
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

// Payment verification route
PaymentRouter.post("/verify", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, teamId } = req.body;

    // Verify Razorpay payment signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", config.payment_key_secret)
      .update(body.toString())
      .digest("hex");

    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.log("Invalid signature. Payment verification failed.");
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    console.log("Payment verified successfully:", razorpay_payment_id);

    // Find the team based on the provided teamId
    const team = await Slot_regi.findOne({ _id: teamId });

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    // Update payment status to "paid"
    team.paymentStatus = "paid";
    await team.save();

    console.log("Payment status updated for team:", teamId);

    return res.json({ success: true, message: "Payment verified, status updated!" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default PaymentRouter;