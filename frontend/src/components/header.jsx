import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTrophy, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md absolute z-50 w-full max-w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <FaTrophy className="text-yellow-400" />
          Gaming App
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
          >
            <FaHome />
            Home
          </Link>
          <Link
            to="/tournament"
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
          >
            <FaTrophy />
            Tournament
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
          >
            <FaUserCircle />
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}