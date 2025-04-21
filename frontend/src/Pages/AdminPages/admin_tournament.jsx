import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../FilesPaths/allpath";
import { useNavigate } from "react-router-dom";
import BgImage from "../images/creator.jpg"; // Replace with your image path

export default function RoomForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const dateTime = new Date(`${data.date} ${data.time}`);
    try {
      const response = await axios.post("http://localhost:3000/admin/create", {
        ...data,
        dateTime,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Room creation failed");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Login first
      </div>
    );
  }

  return (
<div
  className="min-h-screen flex justify-center items-center px-4 relative"
  style={{
    backgroundImage: `url(${BgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
  <div className="relative z-10 w-full max-w-4xl p-10 rounded-xl bg-black/40 backdrop-blur-xl text-white shadow-2xl">
    <h2 className="text-4xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
      Create Tournament Room
    </h2>

    {errorMessage && (
      <p className="text-red-400 text-sm mb-4 text-center font-semibold">
        {errorMessage}
      </p>
    )}
    {successMessage && (
      <p className="text-green-400 text-sm mb-4 text-center font-semibold">
        {successMessage}
      </p>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
      {/* Room ID */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Room ID
        </label>
        <input
          type="text"
          {...register("roomId", { required: "Room ID is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
        />
        {errors.roomId && (
          <p className="text-red-400 text-sm mt-1">{errors.roomId.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Date
        </label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
        />
        {errors.date && (
          <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      {/* Time */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Time
        </label>
        <input
          type="time"
          {...register("time", { required: "Time is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
        />
        {errors.time && (
          <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>
        )}
      </div>

      {/* Entry Fee */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Entry Fee
        </label>
        <input
          type="number"
          {...register("entryFee", { required: "Entry Fee is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
        />
        {errors.entryFee && (
          <p className="text-red-400 text-sm mt-1">{errors.entryFee.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Price
        </label>
        <input
          type="number"
          {...register("price", { required: "Price is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
        />
        {errors.price && (
          <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Number of Slots */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Number of Slots
        </label>
        <input
          type="number"
          {...register("slot", { required: "Number of Slots is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
        />
        {errors.slot && (
          <p className="text-red-400 text-sm mt-1">{errors.slot.message}</p>
        )}
      </div>

      {/* Room Type */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Room Type
        </label>
        <select
          {...register("roomType", { required: "Room Type is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 text-white"
        >
          <option value="">Select Map</option>
          <option value="Erangle">Erangle</option>
          <option value="Miramar">Miramar</option>
          <option value="Shanok">Shanok</option>
        </select>
        {errors.roomType && (
          <p className="text-red-400 text-sm mt-1">{errors.roomType.message}</p>
        )}
      </div>

      {/* Game Mode */}
      <div>
        <label className="block mb-2 font-semibold text-lg text-white">
          Game Mode
        </label>
        <select
          {...register("gameMode", { required: "Game Mode is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 text-white"
        >
          <option value="">Select Mode</option>
          <option value="solo">Solo</option>
          <option value="duo">Duo</option>
          <option value="squad">Squad</option>
        </select>
        {errors.gameMode && (
          <p className="text-red-400 text-sm mt-1">{errors.gameMode.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="col-span-2">
        <label className="block mb-2 font-semibold text-lg text-white">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full p-3 rounded-lg bg-gray-900/20 border border-gray-700 text-white placeholder:text-gray-400"
          rows={3}
          placeholder="Enter brief info about the room, rules, etc."
        ></textarea>
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black transition duration-300 py-3 rounded-lg font-bold shadow-md"
        >
          Create Room
        </button>
      </div>
    </form>
  </div>
</div>
  );
}
