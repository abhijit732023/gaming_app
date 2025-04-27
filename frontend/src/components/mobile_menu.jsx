import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaTrophy, FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaClipboardList } from "react-icons/fa"; // Added FaClipboardList for "My Tournaments"
import { useAuth, Loading } from "../FilesPaths/allpath.js";

const MobileMenu = () => {
  const { user, logout } = useAuth(); // Import user and logout from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to control loader visibility
  const navigate = useNavigate();

  const userId = user?._id; // Save user._id in userId variable

  // Handle navigation
  const navigateTo = (path) => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      navigate(path);
      setIsLoading(false); // Hide loader after 1.5 seconds
      setIsMenuOpen(false); // Close the menu after navigation
    }, 1500);
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoading(true); // Show loader
    try {
      await logout(); // Call the Logout function
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page after logout
        setIsLoading(false); // Hide loader after 1.5 seconds
      }, 1500);
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false); // Hide loader in case of an error
    }
  };

  return (
    <div className="relative">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-60">
          <Loading size="80" speed="2" color="#FACC15" />
        </div>
      )}

      {/* Menu Icon */}
      <div className="absolute top-4 left-4 z-40">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-yellow-500 p-2 rounded-md"
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`transform transition-all ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 bg-black/90 text-white z-50 shadow-lg w-64`}
      >
        <header className="bg-gradient-to-r from-yellow-500 to-red-500 flex items-center py-6 px-4">
          <FaUserCircle className="text-white text-4xl" />
          <div className="ml-4">
            <h1 className="text-white text-lg font-bold">Welcome, {user?.name || "User"}</h1>
            <p className="text-gray-300 text-sm">Gaming Enthusiast</p>
          </div>
        </header>

        <ul className="px-4 py-6 space-y-4">
          <li
            className="flex items-center gap-4 text-white text-md py-2 cursor-pointer hover:text-yellow-500"
            onClick={() => navigateTo("/")}
          >
            <FaHome />
            Home
          </li>
          <li
            className="flex items-center gap-4 text-white text-md py-2 cursor-pointer hover:text-yellow-500"
            onClick={() => navigateTo("/tournament")}
          >
            <FaTrophy />
            Tournaments
          </li>
          <li
            className="flex items-center gap-4 text-white text-md py-2 cursor-pointer hover:text-yellow-500"
            onClick={() => navigateTo("/profile")}
          >
            <FaUserCircle />
            Profile
          </li>
          <li
            className="flex items-center gap-4 text-white text-md py-2 cursor-pointer hover:text-yellow-500"
            onClick={() => navigateTo(`/mytournament/${userId}`)} // Navigate to My Tournaments using userId variable
          >
            <FaClipboardList />
            My Tournaments
          </li>
          <li
            className="flex items-center gap-4 text-white text-md py-2 cursor-pointer hover:text-red-500"
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout(); // Call the handleLogout function
            }}
          >
            <FaSignOutAlt />
            Logout
          </li>
        </ul>

        {/* Close Icon at the Bottom */}
        <div className="flex justify-center py-4 border-t border-gray-700">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-yellow-500 hover:text-red-500 transition"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Overlay to close the menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MobileMenu;