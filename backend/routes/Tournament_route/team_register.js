import express from "express";
import Slot_regi from '../../models/Tournament/slot_register.js'; // Import Slot Registration Model
import RoomModel from "../../models/Admin/createtournament.js"; // Import Tournament Model

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      tournamentId,
      userId,
      teamName,
      slot,
      leader,
      teammates,
      dateTime,
      entryFee,
      gameMode,
      roomType,
    } = req.body;

    console.log("Request Body:", req.body); // Log the request body for debugging

    // Validate required fields
    if (
      !tournamentId ||
      !userId ||
      !teamName ||
      !slot ||
      !leader ||
      !teammates ||
      teammates.length === 0 ||
      !dateTime ||
      !entryFee ||
      !gameMode ||
      !roomType
    ) {
      return res.status(400).json({
        success: false,
        errorType: "MISSING_FIELDS",
        message: "All fields are required",
      });
    }

    // Check if the team name already exists for the tournament
    const existingTeam = await Slot_regi.findOne({ tournamentId, teamName });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        errorType: "TEAM_NAME_EXISTS",
        message: "This team name is already taken.",
      });
    }

    // Check if the slot is already taken for the tournament
    const existingSlot = await Slot_regi.findOne({ tournamentId, slot });
    if (existingSlot) {
      return res.status(400).json({
        success: false,
        errorType: "SLOT_TAKEN",
        message: `Slot ${slot} is already booked. Please choose another.`,
      });
    }

    // Check if the tournament exists
    const tournament = await RoomModel.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        errorType: "TOURNAMENT_NOT_FOUND",
        message: "Tournament not found",
      });
    }

    // Check if the leader's email is already registered for the tournament
    const existingLeader = await Slot_regi.findOne({
      tournamentId,
      "leader.email": leader.email,
    });
    if (existingLeader) {
      return res.status(400).json({
        success: false,
        errorType: "LEADER_EMAIL_EXISTS",
        message: `Leader with email ${leader.email} is already registered.`,
      });
    }

    // Check if any teammate's BGMI ID is already registered for the tournament
    for (const teammate of teammates) {
      const existingTeammate = await Slot_regi.findOne({
        tournamentId,
        "teammates.bgmiId": teammate.bgmiId,
      });
      if (existingTeammate) {
        return res.status(400).json({
          success: false,
          errorType: "TEAMMATE_EXISTS",
          message: `Teammate with BGMI ID ${teammate.bgmiId} is already registered.`,
        });
      }
    }

    // Calculate payment amount based on game mode
    let paymentAmount = 0;
    switch (gameMode.toLowerCase()) {
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
          message: "Invalid game mode",
        });
    }

    // Create a new team with all required fields
    const newTeam = new Slot_regi({
      tournamentId,
      userId,
      teamName,
      slot,
      leader,
      teammates,
      paymentAmount,
      paymentStatus: "pending",
      dateTime, // Add dateTime from requestData
      entryFee, // Add entryFee from requestData
      gameMode, // Add gameMode from requestData
      roomType, // Add roomType from requestData
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team registered successfully!",
      newTeam,
      paymentAmount,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      errorType: "SERVER_ERROR",
      message: "Server error. Try again.",
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

router.get("/mytournament/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const teams = await Slot_regi.find({ userId: userId });
    res.json({ message: "Teams fetched successfully by userId", teams });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams by userId" });
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



router.get('/admin/email/send', async (req, res) => {
  try {
    // Fetch all teams from the Slot_regi collection
    const teams = await Slot_regi.find();

    // Log the teams for debugging
    console.log("Fetched Teams:", teams);

    // Send response with the fetched teams
    res.status(200).json({ success: true, message: "Teams fetched successfully", teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;