import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      console.log("User registered:", response.data);
      setMessage("User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <h1>hello</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Register</h2>

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

export default App;

