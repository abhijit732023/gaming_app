import express from "express";
import RoomModel from "../../models/Admin/createtournament.js";

const CreateRoom = express.Router();

CreateRoom.post("/", async (req, res) => {
  try {
    const { roomId, dateTime, roomType, gameMode, entryFee, price, description ,slot} = req.body;

    console.log("Received data:", req.body);

    // Validate required fields
    if (!roomId || !dateTime || !roomType || !gameMode || !entryFee || !price || !description|| !slot) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if room ID already exists
    const existingRoom = await RoomModel.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: "Room ID already exists. Choose a different one." });
    }

    // Validate room type
    const validRoomTypes = ["Erangle", "Miramar", "Shanok"];
    if (!validRoomTypes.includes(roomType)) {
      return res.status(400).json({ message: "Invalid room type." });
    }

    // Validate game mode & auto-assign slots
    const gameModes = { solo: 1, duo: 2, squad: 4 };
    if (!gameModes[gameMode]) {
      return res.status(400).json({ message: "Invalid game mode." });
    }
  

    // Convert dateTime to a Date object
    const formattedDateTime = new Date(dateTime);

    // Create the room entry
    const room = await RoomModel.create({
      roomId,
      dateTime: formattedDateTime,
      roomType,
      gameMode,
      entryFee,
      price,
      slot,
      description,
    });

    console.log("Room created successfully:", room);
    res.status(201).json({ message: "Room created successfully!", room });

  } catch (error) {
    console.error("Error creating room:", error.message);
    res.status(500).json({ message: "Error creating room" });
  }
});

export default CreateRoom;
