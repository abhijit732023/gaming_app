import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room", // Reference to the Tournament model
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    teamName: {
      type: String,
      required: true,
    },
    leader: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    teammates: [
      {
        name: { type: String, required: true },
        bgmiId: { type: String, required: true },
      },
    ],
    slot: {
      type: Number,
      required: true,
    },
    paymentAmount: { type: Number, required: true }, // Field for storing payment amount
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" }, // Default is pending
  },
  { timestamps: true }
);

const Slot_regi = mongoose.model("Team", TeamSchema);
export default Slot_regi;