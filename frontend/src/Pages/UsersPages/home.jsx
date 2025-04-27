import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Bgimage from "../images/register2.jpg"; // Adjust path as needed
import BgIImage from "../images/home2.png"; // Adjust path as needed
import homeimage from "../images/home3.png"; // Adjust path as needed
import { Header, MobileMenu } from "../../FilesPaths/allpath"; // Import the Header and MobileMenu components

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Menu for smaller screens */}
      <div className="absolute md:hidden ">
        <MobileMenu />
      </div>
      {/* Hero Section */}
      <section
        className="relative flex flex-col md:flex-row items-center justify-center md:justify-between max-w-full h-screen mx-auto px-6 py-16"
        style={{
          backgroundImage: `url(${windowWidth < 700 ? homeimage : BgIImage})`, // Dynamically switch based on screen width
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 h-full"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 md:w-1/2 space-y-6 text-center md:text-left px-3 md:px-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Join. Compete. Conquer.
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome to the ultimate Battlegrounds Mobile India (BGMI) tournament hub — where elite squads clash, winners rise, and legends are born.
          </p>
          <div className="space-x-4 md:flex justify-center align-middle">
            <Link
              to="/tournament"
              className="inline-block border mt-4 bg-amber-600/20 border-yellow-500 text-yellow-500 hover:bg-yellow-600 hover:text-black font-bold px-6 py-3 rounded-full shadow-lg transition"
            >
              Explore Tournaments
            </Link>
            <Link
              to="/register"
              className="inline-block border mt-4 border-yellow-500 text-yellow-500 hover:bg-yellow-600 hover:text-black font-bold px-6 py-3 rounded-full shadow-lg transition"
            >
              Register Now
            </Link>
          </div>
        </motion.div>
      </section>

      <div
        style={{
          backgroundImage: `url(${Bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* Features */}
        <section className="bg-black/40 opacity-90 py-12 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2">What We Offer</h2>
            <p className="text-gray-400 mb-6">
              Everything you need to experience competitive mobile gaming at its finest.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">Daily Tournaments</h3>
                <p className="text-gray-300">
                  Play every day & compete with thousands of players.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">Cash Prizes</h3>
                <p className="text-gray-300">
                  Win real cash, UCs, and exclusive goodies!
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">Fair Gameplay</h3>
                <p className="text-gray-300">
                  Anti-cheat system & manual reviews to ensure fair competition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-black/60 py-12 px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-white">
            <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">1. Browse Tournaments</h3>
              <p className="text-gray-300">
                Find upcoming tournaments with all the details: time, entry fees, rewards, and more.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">2. Register Your Squad</h3>
              <p className="text-gray-300">
                Create your squad and register by uploading payment proof and your in-game details.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">3. Play & Win</h3>
              <p className="text-gray-300">
                Battle it out, top the leaderboards, and earn real prizes and recognition.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-12 bg-black/80 ">
          <h2 className="text-3xl font-bold mb-4">
            Ready to conquer the battleground?
          </h2>
          <Link
            to="/tournament"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
          >
            Register Your Squad
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
