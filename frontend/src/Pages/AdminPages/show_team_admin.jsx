import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import BgImage from "../images/money.webp"; // Add your background image path
import { ENV_File } from "../../FilesPaths/allpath";

export default function ShowTeams() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      await axios.get(`${ENV_File.backendURL}/team/teamss/${id}`);
      setLoading(false);
    } catch (error) {
      setError("Error fetching team registrations.");
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen backdrop-blur-2xl flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black backdrop-blur-5xl opacity-80 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl p-6">
        {/* Title */}
        <motion.h1
          className="text-4xl text-white font-extrabold mb-6 tracking-wide text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🏆 Teams Registered for Tournament
        </motion.h1>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/admin/edit"
            className="text-gray-300 hover:text-white transition duration-300 flex items-center gap-1"
          >
            <FaArrowLeft /> Back to Admin Panel
          </Link>
        </motion.div>

        {/* Paid/Unpaid Cards */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Paid Teams */}
          <Link
            to={`/admin/edit/teams/paid/${id}`}
            className="relative p-6 bg-white/5 border border-blue-500 rounded-2xl shadow-xl backdrop-blur-md text-white flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl group"
          >
            <FaCheckCircle className="text-4xl text-blue-400 mb-2 group-hover:text-blue-300 transition" />
            <h2 className="text-xl font-bold mb-1">Paid Teams</h2>
            <p className="text-sm text-blue-200">View all teams who have completed payment</p>
            <span className="absolute inset-0 bg-blue-700 opacity-10 blur-lg rounded-2xl pointer-events-none" />
          </Link>

          {/* Unpaid Teams */}
          <Link
            to={`/admin/edit/teams/unpaid/${id}`}
            className="relative p-6 bg-white/5 border border-red-500 rounded-2xl shadow-xl backdrop-blur-md text-white flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl group"
          >
            <FaTimesCircle className="text-4xl text-red-400 mb-2 group-hover:text-red-300 transition" />
            <h2 className="text-xl font-bold mb-1">Unpaid Teams</h2>
            <p className="text-sm text-red-200">View all teams yet to complete payment</p>
            <span className="absolute inset-0 bg-red-700 opacity-10 blur-lg rounded-2xl pointer-events-none" />
          </Link>
        </motion.div>

        {/* Loading or Error Message */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {loading ? (
            <p className="text-white text-lg animate-pulse">⏳ Loading teams...</p>
          ) : error ? (
            <p className="text-red-500 text-lg">{error}</p>
          ) : (
            <p className="text-gray-300 text-lg mt-4">Select a category to manage teams.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}