import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    dateTime: { type: Date, required: true }, // Single Date field for sorting/filtering
    roomType: { 
      type: String, 
      enum: ["Erangle", "Miramar", "Shanok"], 
      required: true 
    },
    gameMode: { 
      type: String, 
      enum: ["solo", "duo", "squad"], 
      required: true 
    },
    entryFee: { type: Number, required: true },
    price: { type: Number, required: true },
    slot: { type: Number, required: true }, // Auto-filled based on game mode
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RoomModel = mongoose.model("Room", roomSchema);
export default RoomModel;
