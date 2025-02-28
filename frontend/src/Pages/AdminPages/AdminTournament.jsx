import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";

export default function RoomForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitting data:", data); // Log the data being submitted
    
    try {
      const response = await axios.post("http://localhost:3000/admin/create", data);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      console.log("Room Data:", response.data);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Room creation failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Room</h2>
      {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Room ID</label>
          <input
            {...register("roomId", { required: "Room ID is required" })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          {errors.roomId && <p className="text-red-500 text-sm">{errors.roomId.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Date & Time</label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: "Date & Time is required" })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Room Type</label>
          <select {...register("roomType", { required: "Room Type is required" })} className="w-full p-2 rounded bg-gray-700 border border-gray-600">
            <option value="">Select a room type</option>
            <option value="erangle">Erangle</option>
            <option value="miramar">Miramar</option>
            <option value="shanok">Shanok</option>
          </select>
          {errors.roomType && <p className="text-red-500 text-sm">{errors.roomType.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Entry Fee</label>
          <input
            type="number"
            {...register("entryFee", { required: "Entry Fee is required" })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          {errors.entryFee && <p className="text-red-500 text-sm">{errors.entryFee.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Slot</label>
          <input
            type="number"
            {...register("slot", { required: "Slot is required" })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          {errors.slot && <p className="text-red-500 text-sm">{errors.slot.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
