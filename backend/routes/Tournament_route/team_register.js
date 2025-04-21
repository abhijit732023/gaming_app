import express from "express";
import Slot_regi from '../../models/Tournament/slot_register.js'; // Import Slot Registration Model
import RoomModel from "../../models/Admin/createtournament.js"; // Import Tournament Model

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { tournamentId, teamName, slot, leader, teammates } = req.body;
    console.log("Request Body:", req.body); // Log the request body for debugging
    

    if (!tournamentId || !teamName || !slot || !leader || !teammates || teammates.length === 0) {
      return res.status(400).json({
        success: false,
        errorType: "MISSING_FIELDS",
        message: "All fields are required"
      });
    }

    const existingTeam = await Slot_regi.findOne({ tournamentId, teamName });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        errorType: "TEAM_NAME_EXISTS",
        message: "This team name is already taken."
      });
    }

    const existingSlot = await Slot_regi.findOne({ tournamentId, slot });
    if (existingSlot) {
      return res.status(400).json({
        success: false,
        errorType: "SLOT_TAKEN",
        message: `Slot ${slot} is already booked. Please choose another.`
      });
    }

    const tournament = await RoomModel.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        errorType: "TOURNAMENT_NOT_FOUND",
        message: "Tournament not found"
      });
    }

    const existingLeader = await Slot_regi.findOne({ tournamentId, "leader.email": leader.email });
    if (existingLeader) {
      return res.status(400).json({
        success: false,
        errorType: "LEADER_EMAIL_EXISTS",
        message: `Leader with email ${leader.email} is already registered.`
      });
    }

    for (const teammate of teammates) {
      const existingTeammate = await Slot_regi.findOne({ tournamentId, "teammates.bgmiId": teammate.bgmiId });
      if (existingTeammate) {
        return res.status(400).json({
          success: false,
          errorType: "TEAMMATE_EXISTS",
          message: `Teammate with BGMI ID ${teammate.bgmiId} is already registered.`
        });
      }
    }

    let paymentAmount = 0;
    switch (tournament.gameMode.toLowerCase()) {
      case "solo":
        paymentAmount = 100;
        break;
      case "duo":
        paymentAmount = 200;
        break;
      case "squad":
        paymentAmount = 400;
        break;
      default:
        return res.status(400).json({
          success: false,
          errorType: "INVALID_MODE",
          message: "Invalid game mode"
        });
    }

    const newTeam = new Slot_regi({
      tournamentId,
      teamName,
      slot,
      leader,
      teammates,
      paymentAmount,
      paymentStatus: "pending"
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team registered successfully!",
      newTeam,
      paymentAmount
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      errorType: "SERVER_ERROR",
      message: "Server error. Try again."
    });
  }
});


router.get("/teamss/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const teams = await Slot_regi.find({ tournamentId: id });
    res.json({ message: "Teams fetched successfully", teams });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams" });
  }
});

// Delete route for a specific team
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Slot_regi.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team" });
  }
});

router.put("/update-payment/:team_id", async (req, res) => {
  console.log("Request Body:", req.body);
  
  const { team_id,paymentStatus } = req.body;

  try {
    // Validate input
    if (!paymentStatus || !["pending", "paid"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid or missing payment status" });
    }

    // Find and update team
    const updatedTeam = await Slot_regi.findByIdAndUpdate(
      {_id:team_id},
      { paymentStatus },
      { new: true } // return the updated document
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Payment status updated", team: updatedTeam });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server error while updating payment status" });
  }
});

router.get('/:id/slots', async (req, res) => {
  try {
    const tournamentId = req.params.id;

    // Find all teams registered for this tournament
    const teams = await Slot_regi.find({ tournamentId });
    console.log(teams);
    

    // Extract the slots they have taken
    const takenSlots = teams.map(team => Number(team.slot));

    // Send response
    res.status(200).json({ takenSlots });
  } catch (error) {
    console.error('Error fetching taken slots:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





export default router;