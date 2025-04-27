import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaUserTie, FaMoneyBillWave, FaUsers, FaTrashAlt } from "react-icons/fa";
import BgImage from "../images/unpiad.webp"; // Add your background image path
import { ENV_File } from "../../FilesPaths/allpath";

export default function UnpaidTeams() {
  const { id } = useParams(); // Tournament ID
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${ENV_File.backendURL}/team/teamss/${id}`);
      const unpaidTeams = response.data.teams.filter((team) => team.paymentStatus === "pending");
      setTeams(unpaidTeams);
      setLoading(false);
    } catch (error) {
      setError("Error fetching unpaid team registrations.");
      setLoading(false);
    }
  };

  const deleteTeam = async (teamId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this unpaid team?");
    if (confirmDelete) {
      try {
        await axios.delete(`${ENV_File.backendURL}/team/delete/${teamId}`);
        setTeams(teams.filter((team) => team._id !== teamId));
      } catch (error) {
        setError("Error deleting team.");
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl p-6">
        {/* Title */}
        <motion.h1
          className="text-white text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🔸 Unpaid Teams
        </motion.h1>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={`/admin/edit/teams/${id}`}
            className="text-blue-400 hover:text-white transition duration-300 flex items-center gap-1"
          >
            <FaArrowLeft /> Back to Admin Panel
          </Link>
        </motion.div>

        {/* Team List */}
        {loading ? (
          <p className="text-white text-lg animate-pulse mt-6">⏳ Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg mt-6">{error}</p>
        ) : teams.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {teams.map((team) => (
              <motion.div
                key={team._id}
                className="bg-white/5 border border-red-600 backdrop-blur-md text-white p-6 rounded-xl shadow-xl transition-transform transform hover:scale-105 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-2">🚩 {team.teamName}</h2>
                <p className="text-gray-300 flex items-center gap-2 mb-1">
                  <FaUserTie /> Leader: {team.leader.name} ({team.leader.email})
                </p>
                <p className="text-gray-300 flex items-center gap-2 mb-1">
                  <FaMoneyBillWave /> Amount: ₹{team.paymentAmount}
                </p>
                <p className="text-red-400 font-semibold mb-1">
                  Payment Status: {team.paymentStatus.toUpperCase()}
                </p>
                <p className="text-gray-400 text-sm">Created: {new Date(team.createdAt).toLocaleString()}</p>
                <p className="text-gray-400 text-sm mb-3">Updated: {new Date(team.updatedAt).toLocaleString()}</p>

                <h3 className="text-lg font-semibold mt-4 mb-1 flex items-center gap-1">
                  <FaUsers /> Teammates:
                </h3>
                <ul className="list-disc list-inside text-gray-300">
                  {team.teammates.map((teammate, index) => (
                    <li key={index}>
                      {teammate.name} (BGMI ID: {teammate.bgmiId})
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => deleteTeam(team._id)}
                  className="mt-5 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                >
                  <FaTrashAlt /> Delete Team
                </button>

                {/* Glow/Blur Effect */}
                <span className="absolute inset-0 bg-red-800 opacity-10 blur-2xl rounded-xl pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-300 text-lg mt-6">No unpaid teams found.</p>
        )}
      </div>
    </div>
  );
}