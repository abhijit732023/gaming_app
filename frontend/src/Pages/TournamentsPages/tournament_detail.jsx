import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ENV_File, Loading } from "../../FilesPaths/allpath.js";
import {
  FaGamepad,
  FaCalendarAlt,
  FaClock,
  FaMoneyBill,
  FaTrophy,
  FaUsers,
  FaMapMarkedAlt,
  FaCheckCircle,
} from "react-icons/fa";
import BgImage from "../images/Xsuit.webp"; // Add your background image path

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/mainpage/${id}`, {
          withCredentials: true,
        });
        setTournament(response.data.room);
      } catch (err) {
        setError("Failed to fetch tournament details.");
      }
    };
    fetchTournamentDetails();
  }, [id]);

  const handleSlotRegister = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(`/tournament/tournament_id/${id}`);
      setIsNavigating(false);
    }, 1500);
  };

  if (isNavigating || !tournament) {
    return (
      <div
        className="flex items-center justify-center min-h-screen text-white relative"
        style={{
          backgroundImage: `url(${BgImage}?v=1)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div>
        {/* Gear Up Heading */}
        <motion.h2
          className="relative z-10 text-3xl md:text-4xl font-extrabold text-center text-yellow-400 drop-shadow-lg mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🎮 Gear Up. Drop In. Win Big.
        </motion.h2>

        {/* Details Card */}
        <motion.div
          className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-md rounded-xl shadow-2xl text-white  pt-4 p-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 text-center">
            {tournament?.name}
          </h1>

          {/* Tournament Details and Rules */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tournament Details */}
            <div className="space-y-3 text-lg">
              <p>
                <FaUsers className="inline mr-2 text-green-300" />{" "}
                <strong>Total Teams:</strong> {tournament?.totalTeams || "16"}
              </p>
              <p>
                <FaMapMarkedAlt className="inline mr-2 text-purple-300" />{" "}
                <strong>Map:</strong> {tournament?.roomType || "Erangel"}
              </p>
              <p>
                <FaMoneyBill className="inline mr-2 text-yellow-300" />{" "}
                <strong>Entry Fee:</strong> ₹{tournament?.entryFee}
              </p>
              <p>
                <FaTrophy className="inline mr-2 text-pink-400" />{" "}
                <strong>Prize:</strong> ₹{tournament?.price}
              </p>
              <p>
                <FaCalendarAlt className="inline mr-2 text-orange-300" />{" "}
                <strong>Date:</strong>{" "}
                {new Date(tournament?.dateTime).toLocaleDateString()}
              </p>
              <p>
                <FaClock className="inline mr-2 text-cyan-300" />{" "}
                <strong>Time:</strong>{" "}
                {new Date(tournament?.dateTime).toLocaleTimeString()}
              </p>
              <p>
                <FaGamepad className="inline mr-2 text-red-400" />{" "}
                <strong>Match Type:</strong> {tournament?.gameMode || "Unknown"}
              </p>
            </div>

            {/* Rules Section */}
            <div className="bg-white/5 p-4 rounded-md max-h-60 overflow-y-auto space-y-2">
              <h2 className="text-xl font-semibold text-yellow-300 mb-2">
                📜 Rules & Guidelines
              </h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>No emulators allowed.</li>
                <li>Team must check-in 15 mins before match start.</li>
                <li>Hacking/cheating leads to permanent ban.</li>
                <li>Only mobile devices are allowed.</li>
                <li>Team kill = qualification.</li>
                <li>Use same team name during registration.</li>
              </ul>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-md text-gray-200">
              <FaCheckCircle className="inline mr-2 text-green-400" />
              {tournament?.description ||
                "Join the ultimate battleground and fight for glory and cash prizes!"}
            </p>
          </div>

          {/* Register Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleSlotRegister}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              🚀 Register Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TournamentDetail;