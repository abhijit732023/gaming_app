import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Loading, MobileMenu, Header } from "./../../FilesPaths/allpath.js"; // Import MobileMenu and Header components
import { motion } from "framer-motion";
import BgImage from "../images/bg.jpg"; // Add background image
import MRmage from "../images/miramar.png"; // Add Miramar image
import ERmage from "../images/erangle.png"; // Add Erangle image
import SHImage from "../images/shanok.png"; // Add Shanok image
import Joinus from "../images/joinus.png"; // Add Join Us image

export default function TournamentPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false); // For navigation loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.106:3000/mainpage", {
          withCredentials: true,
        });

        setData(response.data.room);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleJoinClick = (path) => {
    setIsNavigating(true); // Show loader for navigation
    setTimeout(() => {
      navigate(path); // Navigate after a short delay
      setIsNavigating(false); // Hide loader after navigation
    }, 1500); // Adjust delay as needed
  };

  if (isNavigating) {
    // Show loader during navigation
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loading size="45" speed="1.75" color="yellow" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }} // Set duration to 2 seconds for the main container animation
    >
      <Container
        className={`w-full min-h-screen bg-cover bg-center relative`}
        style={{
          backgroundImage: `url(${BgImage})`, // Ensure the image path is correct
          backgroundSize: "cover", // Ensure the image covers the entire container
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
        }}
      >
        {/* Conditional Rendering for Header and MobileMenu */}
        <div className="block md:hidden">
          <MobileMenu /> {/* Show MobileMenu for small screens */}
        </div>
        <div className="hidden md:block">
          <Header /> {/* Show Header for medium and larger screens */}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <motion.h1
          className="text-yellow-400 text-3xl md:text-4xl mb-6 text-center relative z-10 px-4 font-extrabold max-sm:pt-5  pt-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tournament Page
        </motion.h1>

        {error && (
          <p className="text-red-500 relative z-10 text-center px-4">
            Error fetching data: {error.message}
          </p>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 px-4 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.2, delay: 2 }} // Added delay to start after the main container animation
        >
          {data.length > 0 ? (
            data.map((tournament) => (
              <motion.div
                key={tournament._id}
                className="relative bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden"
                style={{ width: "100%", maxWidth: "450px", height: "235px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full bg-cover h-full z-0 max-sm:bg-cover max-sm:top-0">
                  <img
                    src={
                      tournament.roomType.toLowerCase() === "erangle"
                        ? `${ERmage}`
                        : tournament.roomType.toLowerCase() === "miramar"
                        ? `${MRmage}`
                        : tournament.roomType.toLowerCase() === "shanok"
                        ? `${SHImage}`
                        : `${BgImage}`
                    }
                    alt={tournament.roomType}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/40 z-10" />

                {/* Join Link */}
                <button
                  onClick={() => handleJoinClick(`/tournament/detail/${tournament._id}`)}
                  className="absolute bottom-2 right-2 md:bottom-6 md:right-8 z-20 transform transition duration-300"
                >
                  <img
                    src={Joinus}
                    alt="Join Us"
                    className="w-16 max-sm:w-30 md:w-24 blend"
                  />
                </button>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-white text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No tournaments available.
            </motion.p>
          )}
        </motion.div>
      </Container>
    </motion.div>
  );
}