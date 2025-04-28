import React from "react";
import { useAuth } from "../../../ContextApi/contextapi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BgImage from "../images/profile.webp";
import { Header, MobileMenu, ENV_File } from "../../FilesPaths/allpath"; // Import the Header and MobileMenu components

const Profile = () => {
  const { user, logout } = useAuth();
  console.log("user", user);

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gray-900 text-white flex flex-col"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header for larger screens */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Menu for smaller screens */}
      <div className="absolute top-4 left-4">
        <MobileMenu />
      </div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* User Info */}
        <motion.div
          className="backdrop-blur-xl bg-black/60 border border-white/20 p-8 rounded-xl shadow-2xl w-full max-w-md text-center mt-15"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full mx-auto mb-5 bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl flex items-center justify-center text-4xl font-extrabold text-white hover:ring-4 hover:ring-yellow-400 transition-all duration-300 ease-in-out">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>

          <h2 className="text-4xl font-bold mb-2 tracking-wide text-yellow-400">{user?.username || "Player One"}</h2>
          <p className="text-gray-300 mb-6 text-sm">{user?.email || "player@example.com"}</p>

          <div className="space-y-2 text-sm text-gray-200">
            <p>
              <span className="font-semibold text-white">Joined:</span> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold text-white">Role:</span> {user?.role || "Player"}
            </p>
          </div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Tournament Details Section */}
        <motion.div
          className="mt-8 w-full bg-white/10 rounded-xl p-4 text-white text-center backdrop-blur-md shadow-xl max-w-md"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Your Tournament Summary</h3>
          <p className="text-sm text-gray-200 mb-2">Keep an eye on your upcoming battles!</p>

          {/* Replace below with actual tournament data */}
          <ul className="text-left space-y-3">
            <li className="bg-black/40 rounded-lg px-4 py-2 border-2 border-yellow-500">
              <span className="font-semibold">Tournament:</span> Battle Frenzy #1
              <br /> <span className="font-semibold">Slot:</span> 13
              <br /> <span className="font-semibold">Status:</span> <span className="text-green-500">Registered ✅</span>
            </li>
            <li className="bg-black/40 rounded-lg px-4 py-2 border-2 border-yellow-500">
              <span className="font-semibold">Tournament:</span> Squad Showdown
              <br /> <span className="font-semibold">Slot:</span> 27
              <br /> <span className="font-semibold">Status:</span> <span className="text-yellow-400">Pending Payment ⏳</span>
            </li>
          </ul>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="mt-8 w-full bg-white/10 rounded-xl p-4 text-white text-center backdrop-blur-md shadow-xl max-w-md"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Achievements</h3>
          <p className="text-sm text-gray-200 mb-2">Show off your gaming prowess!</p>

          <ul className="text-left space-y-3">
            <li className="bg-black/40 rounded-lg px-4 py-2 border-2 border-yellow-500">
              <span className="font-semibold">Achievement:</span> First Blood
              <br /> <span className="font-semibold">Date:</span> 2025-04-25
            </li>
            <li className="bg-black/40 rounded-lg px-4 py-2 border-2 border-yellow-500">
              <span className="font-semibold">Achievement:</span> Victory Royale
              <br /> <span className="font-semibold">Date:</span> 2025-04-22
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
