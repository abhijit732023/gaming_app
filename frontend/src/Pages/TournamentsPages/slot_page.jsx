import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/conatiner";
import axios from "axios";
import { motion } from "framer-motion";
import BgImage from "../images/pubg-mobile-golden-pharaoh-x-suit-playerunknowns-3840x2160-2631.jpg";
import { useAuth } from "../../FilesPaths/allpath";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SlotPage = () => {
  const { user } = useAuth(); // Get user data from context
  console.log("user", user); // Log user data for debugging
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const [userId,setuserId ] = useState(null); // For navigation loading
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamSize, setTeamSize] = useState(0);
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [takenSlots, setTakenSlots] = useState([]);

  useEffect(() => {
    setuserId(user._id); // Set user ID from context
    const fetchTournamentDetails = async () => {
      try {
        const slotRes = await axios.get(`http://localhost:3000/team/${id}/slots`, { withCredentials: true });
        setTakenSlots(slotRes.data.takenSlots || []);

        const response = await axios.get(`http://localhost:3000/mainpage/${id}`, { withCredentials: true });
        const tournamentData = response.data?.room;

        if (tournamentData) {
          setTournament(tournamentData);
          const mode = tournamentData.gameMode.toLowerCase();
          setTeamSize(mode === "solo" ? 1 : mode === "duo" ? 2 : 4);
          setSlots(Array.from({ length: tournamentData.slot }, (_, i) => i + 1));
        }
      } catch (error) {
        console.error("Error fetching tournament details or slots:", error);
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
        userId: userId, // Use user ID from context
        teamName: data.teamName,
        slot: data.slot,
        leader: {
          name: data.leader.name,
          email: data.leader.email,
        },
        teammates: data.teammates || [],
      };

      const response = await axios.post("http://localhost:3000/team/register", requestData, { withCredentials: true });

      setMessage(response.data.message || "Team Registered Successfully!");

      if (response.data.paymentAmount) {
        const amount = response.data.paymentAmount;
        const team_id = response.data.newTeam._id;
        setPaymentAmount(amount);
        setTimeout(() => {
          navigate(`/payment/${id}/${team_id}/${amount}`);
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { errorType, message } = error.response.data;
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
            setMessage(message || "Something went wrong");
        }
      } else {
        setMessage("Registration Failed. Try Again.");
      }
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
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

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
          <motion.input value={tournament.roomType} readOnly className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 placeholder-gray-400 focus:outline-none" />
          <motion.input value={tournament.gameMode} readOnly className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 placeholder-gray-400 focus:outline-none" />

          {/* Team Info */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🎯 Team Info</motion.h3>
          <motion.input {...register("teamName", { required: "Team Name is required" })} placeholder="Team Name" className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
          {errors.teamName && <p className="text-red-400">{errors.teamName.message}</p>}

          {/* Slot Selection */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🎟️ Slot Selection</motion.h3>
          <motion.select {...register("slot", { required: "Slot selection is required" })} className="w-full p-3 rounded bg-black/40 text-balck border border-gray-600 focus:outline-none">
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
          <motion.input {...register("leader.name", { required: "Leader Name is required" })} placeholder="Leader Name" className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
          {errors.leader?.name && <p className="text-red-400">{errors.leader.name.message}</p>}

          <motion.input {...register("leader.email", { required: "Leader Email is required" })} placeholder="Leader Email" className="w-full p-3 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
          {errors.leader?.email && <p className="text-red-400">{errors.leader.email.message}</p>}

          {/* Teammates */}
          <motion.h3 className="text-xl font-semibold text-yellow-300" variants={fadeIn}>🧑‍🤝‍🧑 Teammates Info</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(teamSize)].map((_, index) => (
              <div key={index} className="border border-yellow-500/30 p-4 rounded-lg bg-black/30 backdrop-blur-sm">
                <motion.input {...register(`teammates[${index}].name`, { required: "Teammate Name is required" })} placeholder={`Teammate ${index + 1} Name`} className="w-full p-2 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
                {errors.teammates?.[index]?.name && <p className="text-red-400">{errors.teammates[index].name.message}</p>}

                <motion.input {...register(`teammates[${index}].bgmiId`, { required: "Teammate BGMI ID is required" })} placeholder={`Teammate ${index + 1} BGMI ID`} className="w-full p-2 mt-2 rounded bg-black/40 text-white border border-gray-600 focus:outline-none" />
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
