import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../ContextApi/contextapi";

export default function UserRegister() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate()
  const{user,login}=useAuth()
  
  const onSubmit = async (data) => {
    login(data)
    console.log("Submitting data:", data); // Log the data being submitted
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      console.log("User registered:", response.data);
      setMessage("User registered successfully!");
      navigate('/login')
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Registration error:", error.response.data.message);
        setMessage(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        setMessage("No response from server. Please try again later.");
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up request:", error.message);
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <h1>hello</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Admin Register</h2>

        {message && <p className="text-red-500 text-xs">{message}</p>}

        {/* Username Field */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Must be at least 6 characters" } })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-2">Register</button>
      </form>
      <Link to="/login">Go to Login</Link>
    </>
  );
};
