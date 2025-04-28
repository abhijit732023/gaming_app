import React, { useState, useEffect } from "react";
import axios from "axios";
import { ENV_File, useAuth, Header, MobileMenu } from "../../FilesPaths/allpath";
import { useNavigate } from "react-router-dom";
import BgImage from "../images/form1.webp"; // Add your background image path here
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

function Mytournament() {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTournaments = async () => {
      if (!user || !user._id) {
        console.warn("User or user ID is not available yet.");
        return;
      }
      try {
        const response = await axios.get(
          `${ENV_File.backendURL}/team/mytournament/user/${user._id}`,
          { withCredentials: true }
        );
        console.log("Fetched mytournaments:", response.data.teams);
        setTournaments(response.data.teams || []);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
        setError("Failed to load tournaments.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserTournaments();
  }, [user?._id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-yellow-400 text-2xl font-extrabold animate-pulse">
        🔄 Loading your tournaments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl font-extrabold animate-bounce">
        ❌ {error}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`, // Set the background image
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Header for Desktop */}
      <div className="hidden md:block absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Mobile Menu for Mobile View */}
      <div className="block md:hidden absolute top-4 left-4 z-20">
        <MobileMenu />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto" style={{ minHeight: "80vh" }}>
        <h1 className="pt-8 text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-8 text-center">
          🎮 My Tournaments
        </h1>

        {tournaments.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            You haven't registered for any tournaments yet. 🚀
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-5 pb-18">
            {tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="relative p-4 bg-white/5 border border-blue-500 rounded-xl shadow-lg backdrop-blur-md text-white flex flex-col justify-start transition-all hover:scale-105 hover:shadow-2xl group"
              >
                <FaCheckCircle className="text-3xl text-blue-400 mb-3 group-hover:text-blue-300 transition self-center" />
                <h2 className="text-lg font-bold mb-3 text-left">Team: {tournament.teamName}</h2>
                <div className="space-y-1 text-left">
                  <p className="text-gray-300">
                    <strong>Leader:</strong> {tournament.leader.name} ({tournament.leader.email})
                  </p>
                  <p className="text-gray-300">
                    <strong>Slot:</strong> {tournament.slot}
                  </p>
                  <p
                    className={`mt-1 font-bold ${tournament.paymentStatus === "paid" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    <strong>Payment:</strong> ₹{tournament.paymentAmount} | {tournament.paymentStatus}
                  </p>
                  <p className="text-gray-300">
                    <strong>Entry Fee:</strong> ₹{tournament.entryFee}
                  </p>
                  <p className="text-gray-300">
                    <strong>Game Mode:</strong> {tournament.gameMode}
                  </p>
                  <p className="text-gray-300">
                    <strong>Room Type:</strong> {tournament.roomType}
                  </p>
                  <p className="text-gray-300">
                    <strong>Scheduled Date & Time:</strong> {new Date(tournament.dateTime).toLocaleString()}
                  </p>
                </div>
                <h3 className="text-white font-semibold mt-3 text-left">Teammates:</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm text-left">
                  {tournament.teammates.map((teammate, index) => (
                    <li key={index}>
                      {teammate.name} (BGMI ID: {teammate.bgmiId})
                    </li>
                  ))}
                </ul>

                {/* Buttons Section */}
                <div className={`mt-3 flex ${tournament.paymentStatus === "pending" ? "gap-3" : ""}`}>
                  {tournament.paymentStatus === "pending" && (
                    <button
                      onClick={() =>
                        navigate(`/payment/${tournament.tournamentId}/${tournament.userId}/${tournament._id}/${tournament.paymentAmount}`)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg w-full"
                    >
                      Pay Now ₹{tournament.paymentAmount}
                    </button>
                  )}

                  {/* <button
                    onClick={() =>
                      navigate(`/tournament/tournament_id/${tournament.tournamentId}`)}
                    className={`bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-lg ${tournament.paymentStatus === "pending" ? "w-1/2" : "w-full"
                      }`}
                  >
                    View Details 🚀
                  </button> */}
                </div>

                <span className="absolute inset-0 bg-blue-700 opacity-10 blur-lg rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Mytournament;