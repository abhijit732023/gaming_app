import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    dateTime: { type: Date, required: true },
    roomType: { 
      type: String, 
      enum: ['Erangle', 'Miramar', 'Shanok'], 
      required: true 
    },
    entryFee: { type: Number, required: true },
    price: { type: Number, required: true },
    slot: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
  }
);

const RoomModel = mongoose.model('Room', roomSchema);

export default RoomModel;
