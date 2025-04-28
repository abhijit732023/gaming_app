import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, Loading } from "../FilesPaths/allpath.js";
import { FaHome, FaTrophy, FaUserCircle, FaGamepad, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Header() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // State to control loader visibility
  const navigate = useNavigate();

  // Handle navigation with loading
  const handleNavigation = (path) => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      navigate(path); // Navigate to the selected path
      setIsLoading(false); // Hide loader after navigation
    }, 1500); // Simulate a delay for the loader
  };

  return (
    <header className="bg-amber-900/10 border-b-amber-700/30 border-b-2 text-white shadow-md absolute z-50 w-full max-w-full">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <Loading size="80" speed="2" color="#FACC15" />
        </div>
      )}

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="text-2xl font-bold flex items-center gap-2 hover:scale-120 transition-transform duration-200"
        >
          <FaTrophy className="text-yellow-400" />
          Gaming App
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
          >
            <FaHome />
            Home
          </button>
          {user ? (
            <>
              <button
                onClick={() => handleNavigation("/tournament")}
                className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
              >
                <FaTrophy />
                Tournament
              </button>
              <button
                onClick={() => handleNavigation("/profile")}
                className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
              >
                <FaUserCircle />
                Profile
              </button>
              <button
                onClick={() => handleNavigation(`/mytournament/${user._id}`)}
                className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
              >
                <FaGamepad />
                My Tournament
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
              >
                <FaSignInAlt />
                Login
              </button>
              <button
                onClick={() => handleNavigation("/register")}
                className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
              >
                <FaUserPlus />
                Signup
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}