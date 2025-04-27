import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { MdDateRange, MdConfirmationNumber, MdSchedule } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";

export default function AdminTournamentPanel() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get("http://192.168.0.106:3000/admin/tournaments");
      setTournaments(response.data);
    } catch (error) {
      setError("Error fetching tournaments");
    }
  };

  const deleteTournament = async (id) => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      try {
        await axios.delete(`http://192.168.0.106:3000/admin/tournament/${id}`);
        setTournaments((prev) => prev.filter((t) => t._id !== id));
      } catch (error) {
        alert("Error deleting tournament");
      }
    }
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-yellow-400 text-4xl font-extrabold mb-10 text-center tracking-wide"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🎮 Admin Tournament Dashboard
      </motion.h1>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      {tournaments.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {tournaments.map((t) => (
            <motion.div
              key={t._id}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg transition-all hover:shadow-2xl text-white"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold">{t.roomType}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${t.status === 'completed' ? 'bg-red-600' : 'bg-green-600'}`}>
                  {t.status?.toUpperCase() || 'ACTIVE'}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-1">ID: {t._id}</p>
              <div className="text-sm flex items-center gap-2 mb-1">
                <GiLaurelsTrophy className="text-yellow-400" />
                <span className="text-gray-300">Game Mode: {t.gameMode}</span>
              </div>
              {/* <div className="text-sm flex items-center gap-2 mb-1">
                <MdDateRange className="text-pink-400" />
                <span className="text-gray-300">Date: {t.date?.split("T")[0]}</span>
              </div>
              <div className="text-sm flex items-center gap-2 mb-1">
                <MdSchedule className="text-blue-400" />
                <span className="text-gray-300">Time: {t.date?.split("T")[1]?.slice(0, 5)}</span>
              </div> */}
              <div className="text-sm flex items-center gap-2 mb-3">
                <MdConfirmationNumber className="text-green-400" />
                <span className="text-gray-300">Slots: {t.slot}</span>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between text-sm font-medium">
                {/* Edit Link */}
                <Link
                  to={`/admin/edit/${t._id}`}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-500 transition-all"
                  title="Edit Tournament"
                >
                  <FaEdit /> Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTournament(t._id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-500 transition-all"
                  title="Delete Tournament"
                >
                  <FaTrash /> Delete
                </button>

                {/* Teams Link */}
                <Link
                  to={`/admin/edit/teams/${t._id}`}
                  className="flex items-center gap-1 text-green-400 hover:text-green-500 transition-all"
                  title="View Teams"
                >
                  <FaUsers /> Teams
                </Link>

                {/* Send Email Link */}
                <Link
                  to={`/admin/email/sends/${t._id}`}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-500 transition-all"
                  title="Send Email"
                >
                  <FaEdit /> Send Email
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-white text-center mt-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🔄 Loading tournaments...
        </motion.p>
      )}
    </motion.div>
  );
}
