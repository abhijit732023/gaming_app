import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../ContextApi/contextapi";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../images/pubg-level-3-helmet-3840x2160-864.jpg"; // Adjust the path as needed
import { Leapfrog } from "ldrs/react";
import {Loading} from "../../FilesPaths/allpath.js"; // Import the loading animation component

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add state for loader

  const onSubmit = async (data) => {
    console.log("Submitting data:", data.email);

    try {
      const response = await axios.post("http://192.168.0.106:3000/login", data, {
        withCredentials: true, // Include credentials (cookies) in the request to successfully create cookies
      });
      setSuccessMessage(response.data.message);
      login(response.data.user);
      console.log("heyy", user);
      setErrorMessage("");
      if (login) {
        setIsLoading(true); // Show loader
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-black flex justify-center items-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 1,
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Attracting Text */}
      <div className="absolute top-10 text-center px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-500 drop-shadow-lg">
          Welcome back, warrior. The battleground awaits.
        </h1>
        <p className="text-gray-300 text-sm md:text-lg mt-2">
          Log in to join the action and lead your squad to victory!
        </p>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <Loading size="80" speed="2" color="#B9F0DA"></Loading>
        </div>
      )}

      {/* Login Form */}
      <div
        className={`relative bg-black/30 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0 z-10 ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-4 text-center">
          Login
        </h2>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border-b border-amber-500 rounded text-white bg-transparent focus:outline-none focus:ring-0 peer"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-[-10px] text-gray-400 text-sm transition-all peer-placeholder-shown:opacity-100 peer-placeholder-shown:visible peer-focus:opacity-0 peer-focus:invisible"
            >
              Email
            </label>
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border-b border-amber-500 rounded text-white bg-transparent focus:outline-none focus:ring-0 peer"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-[-10px] text-gray-400 text-sm transition-all peer-placeholder-shown:opacity-100 peer-placeholder-shown:visible peer-focus:opacity-0 peer-focus:invisible"
            >
              Password
            </label>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition duration-200 lg:mt-15"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;