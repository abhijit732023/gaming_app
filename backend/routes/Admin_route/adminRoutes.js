import express from "express";
import RoomModel from "../../models/Admin/createtournament.js";

const Admin_fullcontrol_route = express.Router();

// Get all tournaments
Admin_fullcontrol_route.get("/tournaments", async (req, res) => {
  try {
    const tournaments = await RoomModel.find();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tournaments" });
  }
});

// Get single tournament by ID
Admin_fullcontrol_route.get("/tournament/:id", async (req, res) => {
  try {
    const tournament = await RoomModel.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json({message: "Tournament found", tournament});
  } catch (error) {
    res.status(500).json({ message: "Error fetching tournament" });
  }
});

// Update tournament
Admin_fullcontrol_route.put("/tournament/:id", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body for debugging
    
    const updatedTournament = await RoomModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Tournament updated successfully", updatedTournament });
  } catch (error) {
    res.status(500).json({ message: "Error updating tournament" });
  }
});

// Delete tournament
Admin_fullcontrol_route.delete("/tournament/:id", async (req, res) => {
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Tournament deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tournament" });
  }
});

export default Admin_fullcontrol_route;
