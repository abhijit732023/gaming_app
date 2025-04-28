import { motion } from "framer-motion";
import React from "react";
// For dynamic RGB animation (optional but looks sick!)
const rgbGradient = {
  background: [
    "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet, red)",
    "linear-gradient(90deg, orange, yellow, green, blue, indigo, violet, red, orange)",
    "linear-gradient(90deg, yellow, green, blue, indigo, violet, red, orange, yellow)",
  ],
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  transition: {
    repeat: Infinity,
    repeatType: "mirror",
    duration: 5,
  },
};

export default function WelcomeAnimation() {
  return (
    <div className="text-center space-y-4">
      {/* BIG Welcome text */}
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-5xl md:text-7xl font-extrabold drop-shadow-lg"
        style={rgbGradient}
      >
        Welcome, Gamer!
      </motion.h1>

      {/* Medium size Registered text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl md:text-2xl font-semibold text-white"
      >
        You have successfully registered.
      </motion.p>

      {/* Small Redirecting text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-sm md:text-base text-gray-300 italic"
      >
        Redirecting to login...
      </motion.p>
    </div>
  );
}
