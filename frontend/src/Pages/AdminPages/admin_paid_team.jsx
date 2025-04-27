import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import BgImage from "../images/money2.webp"; // Add your background image path
import { ENV_File } from "../../FilesPaths/allpath";

export default function PaidTeams() {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${ENV_File.backendURL}/team/teamss/${id}`);
      const paidTeams = response.data.teams.filter((team) => team.paymentStatus === "paid");
      setTeams(paidTeams);
      setLoading(false);
    } catch (error) {
      setError("Error fetching paid team registrations.");
      setLoading(false);
    }
  };

  const deleteTeam = async (teamId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team?");
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

      {/* Main Content */}
      <div className="relative z-10 p-6 flex flex-col items-center">
        {/* Title */}
        <motion.h1
          className="text-white text-4xl font-bold mb-6 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Paid Teams
        </motion.h1>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={`/admin/edit/teams/${id}`}
            className="text-blue-400 hover:text-white transition duration-300 underline"
          >
            ⬅ Back to Admin Panel
          </Link>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="mt-10 flex flex-col items-center">
            <p className="text-white text-lg mt-4 animate-pulse">Loading Paid Teams...</p>
          </div>
        ) : error ? (
          <p className="text-red-500 text-lg mt-6">{error}</p>
        ) : teams.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 w-full max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {teams.map((team) => (
              <motion.div
                key={team._id}
                className="relative p-6 bg-white/5 border border-blue-500 rounded-2xl shadow-xl backdrop-blur-md text-white flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <FaCheckCircle className="text-4xl text-blue-400 mb-2 group-hover:text-blue-300 transition" />
                <h2 className="text-xl font-bold mb-1">Team: {team.teamName}</h2>
                <p className="text-gray-300">Leader: {team.leader.name} ({team.leader.email})</p>
                <p className="text-green-400 mt-1">Payment: ₹{team.paymentAmount} | {team.paymentStatus}</p>
                <p className="text-gray-400">Created: {new Date(team.createdAt).toLocaleString()}</p>
                <p className="text-gray-400 mb-2">Updated: {new Date(team.updatedAt).toLocaleString()}</p>
                <h3 className="text-white font-semibold">Teammates:</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {team.teammates.map((t, i) => (
                    <li key={i}>
                      {t.name} (BGMI ID: {t.bgmiId})
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => deleteTeam(team._id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete Team
                </button>
                <span className="absolute inset-0 bg-blue-700 opacity-10 blur-lg rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-300 text-lg mt-10">No paid teams found.</p>
        )}
      </div>
    </div>
  );
}