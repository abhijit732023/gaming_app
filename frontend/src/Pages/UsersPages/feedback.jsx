import React, { useState } from "react";
import axios from "axios";
import { ENV_File } from "../../FilesPaths/allpath";
import BGimage from "../images/spider2.webp"; // Background image

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting feedback:", formData);
      await axios.post(`${ENV_File.backendURL}/feedback`, formData);
      setStatus("Feedback sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center relative p-4 sm:p-6"
      style={{
        backgroundImage: `url(${BGimage})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Feedback Form Container */}
      <div className="relative bg-gray-900/30 backdrop-blur-md border border-blue-500/20 text-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg animate-fade-in z-10">
        
        {/* New Message */}
        <p className="text-center text-sm sm:text-base text-gray-300 mb-4">
          We value your opinion! Help us make your gaming experience even better. 🎮✨
        </p>

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 sm:mb-6 text-center text-neon-green">
          Share Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-500/30 border border-gray-700 focus:border-neon-green focus:ring focus:ring-neon-green/50 rounded-lg p-3 sm:p-4 text-sm sm:text-base transition-all duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-500/30 border border-gray-700 focus:border-neon-green focus:ring focus:ring-neon-green/50 rounded-lg p-3 sm:p-4 text-sm sm:text-base transition-all duration-300"
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            required
            value={formData.message}
            onChange={handleChange}
            className="bg-gray-500/20 border border-gray-700 focus:border-neon-green focus:ring focus:ring-neon-green/50 rounded-lg p-3 sm:p-4 text-sm sm:text-base resize-none transition-all duration-300"
            rows="4"
          />
          <button
            type="submit"
            className="bg-green-500 text-gray-900 font-bold py-3 sm:py-4 rounded-lg hover:bg-green-300 transition-all duration-300 transform hover:scale-105"
          >
            Submit Feedback
          </button>
        </form>

        {status && (
          <p className="mt-5 text-center text-neon-green font-semibold animate-pulse text-sm sm:text-base">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
