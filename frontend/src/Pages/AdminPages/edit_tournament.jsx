import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowLeft, Info, Trophy, CalendarDays, Gamepad2 } from "lucide-react";
import BgImage from "../images/creator.webp";
import { ENV_File } from "../../FilesPaths/allpath";

export default function EditTournament() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTournament();
  }, []);

  const fetchTournament = async () => {
    try {
      const response = await axios.get(`${ENV_File.backendURL}/admin/tournament/${id}`);
      const data = response.data.tournament;
      console.log("Fetched tournament data:", data); // Log the fetched data

      Object.keys(data).forEach((key) => setValue(key, data[key]));
      setValue("date", data.date.split("T")[0]);
      setValue("time", data.date.split("T")[1].substring(0, 5));
    } catch (error) {
      console.error("Error fetching tournament:", error);
      setErrorMessage("Error fetching tournament details. Please try again.");
    }
  };

  const onSubmit = async (formData) => {
    try {
      await axios.put(`${ENV_File.backendURL}/admin/tournament/${id}`, formData);
      setSuccessMessage("Tournament updated successfully!");
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 3 seconds
        navigate("/admin/edit"); // Redirect to tournaments page
      }, 3000);
    } catch (error) {
      console.error("Error updating tournament:", error);
      setErrorMessage("Error updating tournament. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 relative"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0 backdrop-blur-md opacity-50"></div>

      <motion.div
        className="relative z-10 w-full max-w-3xl p-8 rounded-xl bg-white/10 backdrop-blur-lg text-white shadow-xl border border-white/20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-yellow-400">Manage Tournament</h2>
          <span className="text-sm bg-green-600 px-3 py-1 rounded-full">Active</span>
        </div>

        {/* Messages */}
        {errorMessage && <p className="text-red-400 text-sm mb-3">{errorMessage}</p>}
        {successMessage && <p className="text-green-400 text-sm mb-3">{successMessage}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Room ID */}
            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <Trophy className="w-4 h-4" /> Room ID
              </label>
              <input
                type="text"
                {...register("roomId", { required: "Room ID is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
              {errors.roomId && <p className="text-red-400 text-sm">{errors.roomId.message}</p>}
            </div>

            {/* Room Type */}
            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <Gamepad2 className="w-4 h-4" /> Room Type
              </label>
              <select
                {...register("roomType", { required: "Room Type is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              >
                <option value="Erangle">Erangle</option>
                <option value="Miramar">Miramar</option>
                <option value="Shanok">Shanok</option>
              </select>
              {errors.roomType && <p className="text-red-400 text-sm">{errors.roomType.message}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center gap-2 mb-1 font-medium">
                <CalendarDays className="w-4 h-4" /> Date
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
              {errors.date && <p className="text-red-400 text-sm">{errors.date.message}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block mb-1 font-medium">Time</label>
              <input
                type="time"
                {...register("time", { required: "Time is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
              {errors.time && <p className="text-red-400 text-sm">{errors.time.message}</p>}
            </div>

            {/* Entry Fee */}
            <div>
              <label className="block mb-1 font-medium">Entry Fee (₹)</label>
              <input
                type="number"
                {...register("entryFee", { required: "Entry Fee is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
              {errors.entryFee && <p className="text-red-400 text-sm">{errors.entryFee.message}</p>}
            </div>

            {/* Prize */}
            <div>
              <label className="block mb-1 font-medium">Prize Pool (₹)</label>
              <input
                type="number"
                {...register("price", { required: "Prize is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
              {errors.price && <p className="text-red-400 text-sm">{errors.price.message}</p>}
            </div>

            {/* Slots */}
            <div>
              <label className="block mb-1 font-medium">Total Slots</label>
              <input
                type="number"
                {...register("slot", { required: "Slot count is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
              {errors.slot && <p className="text-red-400 text-sm">{errors.slot.message}</p>}
            </div>

            {/* Game Mode */}
            <div>
              <label className="block mb-1 font-medium">Game Mode</label>
              <select
                {...register("gameMode", { required: "Game Mode is required" })}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
              >
                <option value="solo">Solo</option>
                <option value="duo">Duo</option>
                <option value="squad">Squad</option>
              </select>
              {errors.gameMode && <p className="text-red-400 text-sm">{errors.gameMode.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 mb-1 font-medium">
              <Info className="w-4 h-4" /> Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={3}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500"
            />
            {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition duration-300 py-3 rounded font-semibold text-black text-lg"
            whileHover={{ scale: 1.05 }}
          >
            ✅ Update Tournament
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}