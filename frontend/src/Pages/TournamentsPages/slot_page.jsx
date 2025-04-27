import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "../../components/conatiner";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import BgImage from "../images/Xsuit.webp";
import { useAuth,ENV_File } from "../../FilesPaths/allpath";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SlotPage = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setuserId] = useState(null);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamSize, setTeamSize] = useState(0);
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [takenSlots, setTakenSlots] = useState([]);

  useEffect(() => {
    if (user) {
      setuserId(user._id);
    }
    const fetchTournamentDetails = async () => {
      try {
        const slotRes = await axios.get(`${ENV_File.backendURL}/team/${id}/slots`, { withCredentials: true });
        setTakenSlots(slotRes.data.takenSlots || []);
        console.log("Taken Slots:", slotRes.data.takenSlots);
        

        const response = await axios.get(`${ENV_File.backendURL}/mainpage/${id}`, { withCredentials: true });
        const tournamentData = response.data?.room;
        console.log("Tournament Data:", tournamentData);
        

        if (tournamentData) {
          setTournament(tournamentData);
          const mode = tournamentData.gameMode.toLowerCase();
          setTeamSize(mode === "solo" ? 1 : mode === "duo" ? 2 : 4);
          setSlots(Array.from({ length: tournamentData.slot }, (_, i) => i + 1));
        }
      } catch (error) {
        console.error("Error fetching tournament details or slots:", error);
        toast.error("Failed to load tournament details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
  }, [id]);

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const requestData = {
        tournamentId: id,
        userId: userId,
        teamName: data.teamName,
        slot: data.slot,
        leader: {
          name: data.leader.name,
          email: data.leader.email,
        },
        teammates: data.teammates || [],
        dateTime: tournament.dateTime, // Add dateTime from tournament details
        entryFee: tournament.entryFee, // Add entryFee from tournament details
        gameMode: tournament.gameMode, // Add gameMode from tournament details
        roomType: tournament.roomType, // Add roomType from tournament details
      };

      const response = await axios.post(`${ENV_File.backendURL}/team/register`, requestData, {
        withCredentials: true,
      });

      const successMessage = response.data.message || "Team Registered Successfully!";
      setMessage(successMessage);
      alert(successMessage); // ✅ Basic success alert

      if (response.data.paymentAmount) {
        const amount = response.data.paymentAmount;
        const team_id = response.data.newTeam._id;
        setPaymentAmount(amount);
        navigate(`/payment/${id}/${userId}/${team_id}/${amount}`);
      }
    } catch (error) {
      let errorMsg = "Registration Failed. Try Again.";

      if (error.response && error.response.data) {
        const { errorType, message } = error.response.data;
        errorMsg = message || errorMsg;

        // Set form-specific errors
        switch (errorType) {
          case "TEAM_NAME_EXISTS":
            setError("teamName", { type: "manual", message });
            break;
          case "SLOT_TAKEN":
            setError("slot", { type: "manual", message });
            break;
          case "LEADER_EMAIL_EXISTS":
            setError("leader.email", { type: "manual", message });
            break;
          case "TEAMMATE_EXISTS":
            setError("teammates.0.bgmiId", { type: "manual", message });
            break;
          default:
            break;
        }
      }

      alert(errorMsg); // ❌ Basic error alert
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-yellow-400 text-2xl font-bold animate-pulse">
        🔄 Loading Tournament...
      </div>
    );
  }

  return (
    <Container
      className="bg-black min-h-screen overflow-scroll relative"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Link to={-1} className="absolute flex  items-center p-2 text-2xl text-white opacity-100"><p className="text-3xl">⬅</p>Back</Link>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto p-6 bg-black/30 backdrop-blur-2xl text-white rounded-lg shadow-lg mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-center text-4xl font-extrabold text-yellow-400 drop-shadow-xl mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🔥 Enter the Arena – Register Your Squad Now!
        </motion.h1>

        <motion.h2 className="text-2xl font-bold mb-6 text-center" variants={fadeIn} initial="hidden" animate="visible">
          BGMI Tournament Slot Registration
        </motion.h2>

        {message && (
          <motion.p className="text-center text-lg text-green-400 my-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {message}
          </motion.p>
        )}

        {paymentAmount !== null && (
          <motion.p className="text-center text-yellow-300 text-lg" variants={fadeIn} initial="hidden" animate="visible">
            Payment Amount: ₹{paymentAmount}
          </motion.p>
        )}

        <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Game Info */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🎮 Game Details</motion.h3>
          <motion.input value={tournament.roomType} readOnly className="w-full p-3 rounded bg-black/40 text-gray-500 border border-gray-600 placeholder-gray-400 focus:outline-none" />
          <motion.input value={tournament.gameMode} readOnly className="w-full p-3 rounded bg-black/40 text-gray-500 border border-gray-600 placeholder-gray-400 focus:outline-none" />

          {/* Team Info */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🎯 Team Info</motion.h3>
          <motion.input {...register("teamName", { required: "Team Name is required" })} defaultValue={'chor'} placeholder="Team Name" className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
          {errors.teamName && <p className="text-red-400">{errors.teamName.message}</p>}

          {/* Slot Selection */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🎟️ Slot Selection</motion.h3>
          <motion.select {...register("slot", { required: "Slot selection is required" })} className="w-full p-3 rounded bg-black/40 text-black text-white border border-gray-600 focus:outline-none">
            <option value="" disabled>Select a slot</option>
            {slots.map((slot) => (
              <option key={slot} className="text-white" value={slot} disabled={takenSlots.includes(slot)}>
                Slot {slot} {takenSlots.includes(slot) ? "(Taken)" : ""}
              </option>
            ))}
          </motion.select>
          {errors.slot && <p className="text-red-400">{errors.slot.message}</p>}

          {/* Leader Info */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🧑‍💼 Team Leader Info</motion.h3>
          <motion.input {...register("leader.name", { required: "Leader Name is required" })} defaultValue={'abhijit'} placeholder="Leader Name" className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
          {errors.leader?.name && <p className="text-red-400">{errors.leader.name.message}</p>}

          <motion.input {...register("leader.email", { required: "Leader Email is required" })} defaultValue={'abhi@gmail.com'} placeholder="Leader Email" className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
          {errors.leader?.email && <p className="text-red-400">{errors.leader.email.message}</p>}

          {/* Teammates */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🧑‍🤝‍🧑 Teammates Info</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(teamSize)].map((_, index) => (
              <div key={index} className="border border-yellow-500/30 p-4 rounded-lg bg-black/30 backdrop-blur-sm">
                <motion.input {...register(`teammates[${index}].name`, { required: "Teammate Name is required" })} defaultValue={'abhi'} placeholder={`Teammate ${index + 1} Name`} className="w-full p-2 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
                {errors.teammates?.[index]?.name && <p className="text-red-400">{errors.teammates[index].name.message}</p>}

                <motion.input {...register(`teammates[${index}].bgmiId`, { required: "Teammate BGMI ID is required" })} defaultValue={'12345678'} placeholder={`Teammate ${index + 1} BGMI ID`} className="w-full p-2 mt-2 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
                {errors.teammates?.[index]?.bgmiId && <p className="text-red-400">{errors.teammates[index].bgmiId.message}</p>}
              </div>
            ))}
          </div>

          <motion.button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold p-3 rounded-lg hover:bg-yellow-400 hover:shadow-yellow-500/50 shadow-lg transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Register Now
          </motion.button>
        </motion.form>
      </motion.div>
    </Container>
  );
};

export default SlotPage;
