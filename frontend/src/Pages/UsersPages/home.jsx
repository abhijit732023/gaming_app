import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaUserCircle, FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import Bgimage from "../images/register2.webp"; // Adjust path as needed
import BgIImage from "../images/home2.webp"; // Adjust path as needed
import homeimage from "../images/home3.webp"; // Adjust path as needed
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
          backgroundImage: `url(${windowWidth < 700 ? homeimage : BgIImage}?v=1)`, // Dynamically switch based on screen width
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
              className="inline-block border mt-4 bg-amber-600/40 border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-black font-bold px-6 py-3 rounded-full shadow-lg transition"
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
          backgroundImage: `url(${Bgimage}?v=1)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* Features */}
        {/* What We Offer */}
        <section className="bg-gradient-to-b from-black/70 to-black py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">What We Offer</h2>
            <p className="text-gray-400 mb-10 text-lg">
              Your gateway to the most thrilling mobile gaming tournaments.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-gray-800 hover:bg-amber-600/20 transition p-8 rounded-2xl shadow-xl flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Daily Tournaments</h3>
                <p className="text-gray-300">
                  Dive into daily action-packed battles and climb the leaderboards every day.
                </p>
              </div>
              <div className="bg-gray-800 hover:bg-amber-600/20 transition p-8 rounded-2xl shadow-xl flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Cash Prizes</h3>
                <p className="text-gray-300">
                  Win real cash rewards, UCs, and exclusive merchandise with every win.
                </p>
              </div>
              <div className="bg-gray-800 hover:bg-amber-600/20 transition p-8 rounded-2xl shadow-xl flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Fair Gameplay</h3>
                <p className="text-gray-300">
                  We guarantee fair fights with advanced anti-cheat systems and manual oversight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-black/80 py-16 px-6 text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-10">How It Works</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-white">
            <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition">
              <div className="text-5xl mb-4 text-yellow-500">📅</div>
              <h3 className="text-2xl font-semibold mb-3">1. Browse Tournaments</h3>
              <p className="text-gray-400">
                Explore daily tournaments with complete details like entry fees, timings, and prize pools.
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition">
              <div className="text-5xl mb-4 text-yellow-500">📝</div>
              <h3 className="text-2xl font-semibold mb-3">2. Register Your Squad</h3>
              <p className="text-gray-400">
                Form your dream squad, upload payment proof, and register seamlessly.
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition">
              <div className="text-5xl mb-4 text-yellow-500">🏆</div>
              <h3 className="text-2xl font-semibold mb-3">3. Play & Win</h3>
              <p className="text-gray-400">
                Dominate the battlefield, secure your victories, and claim your rewards!
              </p>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="bg-gradient-to-t from-black via-gray-900 to-black py-16 text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">
            Ready to conquer the battleground?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of players in the fiercest mobile gaming tournaments today.
          </p>
          <Link
            to="/tournament"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-10 py-4 rounded-full text-xl shadow-lg hover:shadow-yellow-400/30 transition"
          >
            Register Your Squad
          </Link>
        </section>

      </div>
      {/* Footer */}
      <footer className="bg-black/80 text-gray-400 py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

          {/* Branding */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">BattleGrounds Hub</h3>
            <p>Your one-stop destination for BGMI tournaments, prizes, and glory.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-500 transition">Home</Link></li>
              <li><Link to="/tournament" className="hover:text-yellow-500 transition">Tournaments</Link></li>
              <li><Link to="/register" className="hover:text-yellow-500 transition">Register</Link></li>
              <li><Link to="/feedback" className="hover:text-yellow-500 transition">Feedback</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: support@battlegroundshub.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Location: India</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                <FaInstagram size={24} />

              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
                <FaYoutube size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">
                <FaDiscord size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BattleGrounds Hub. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
};

export default Home;
