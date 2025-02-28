import express from 'express';
import {RoomModel} from '../../index.js';

const CreateRoom = express.Router();

CreateRoom.post('/', async (req, res) => {
  const { roomId, dateTime, roomType, entryFee, price, slot, description } = req.body;
  console.log("Received data:", req.body); // Log the received data

  try {
    const room = await RoomModel.create({
      roomId,
      dateTime,
      roomType,
      entryFee,
      price,
      slot,
      description
    });
    console.log("Room created successfully:", room);
    res.status(201).send({ message: "Room created successfully!" });
  } catch (error) {
    console.error("Error creating room:", error.message);
    res.status(500).send({ message: "Error creating room" });
  }
});

export default CreateRoom;