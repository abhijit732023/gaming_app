import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../FilesPaths/allpath.js';
import { FaHome, FaTrophy, FaUserCircle, FaGamepad } from "react-icons/fa";

export default function Header() {
  const { user } = useAuth();
  console.log(user); // Log user info for debugging

  return (
    <header className="bg-amber-900/15 border-b-amber-600 border-b-2 text-white shadow-md absolute z-50 w-full max-w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2 hover:scale-120 transition-transform duration-200"
        >
          <FaTrophy className="text-yellow-400" />
          Gaming App
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
          >
            <FaHome />
            Home
          </Link>
          <Link
            to="/tournament"
            className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
          >
            <FaTrophy />
            Tournament
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
          >
            <FaUserCircle />
            Profile
          </Link>
          {user && (
            <Link
              to={`/mytournament/${user._id}`}
              className="flex items-center gap-2 text-white hover:text-yellow-400 hover:scale-115 transition-transform duration-200"
            >
              <FaGamepad />
              My Tournament
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}