import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../ContextApi/contextapi";
import BgImage from "../images/register.webp"; // Add your background image path
import { Loading, ENV_File, RGBLight, Header, MobileMenu } from "../../FilesPaths/allpath.js"; // Import Loading component
import { motion } from "framer-motion"; // New Import for animation

export default function UserRegister() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message for logged-in users
  const [showLoading, setShowLoading] = useState(false); // Track Loading component visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      setErrorMessage("You are already logged in. Please logout first to access the registration page.");
      setTimeout(() => {
        navigate("/profile"); // Redirect to the profile page or another appropriate page
      }, 5000);
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    if (user) {
      // Show error if the user is already logged in
      setErrorMessage("You are already logged in. Please logout first to access the registration page.");
      return;
    }

    console.log("Submitting data:", data);
    setShowLoading(true);
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(`${ENV_File.backendURL}/register`, data);
        console.log("User registered:", response.data);
        setMessage("User registered successfully!");
        setIsRegistered(true);
        setShowLoading(false);

        // Navigate after 4 seconds so user can enjoy animation
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (error) {
        setShowLoading(false);
        if (error.response) {
          console.error("Registration error:", error.response.data.message);
          setMessage(error.response.data.message);
        } else if (error.request) {
          console.error("No response received:", error.request);
          setMessage("No response from server. Please try again later.");
        } else {
          console.error("Error setting up request:", error.message);
          setMessage("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }, 4000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header for Desktop */}
      <div className="hidden md:block absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Mobile Menu */}
      <div className="block md:hidden absolute top-0 left-0 w-full z-20">
        <MobileMenu />
      </div>

      {/* Loader Overlay */}
      {showLoading && (
        <div className="absolute inset-0 bg-black opacity-60 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}

      {/* Error Message for Logged-In Users */}
      {errorMessage && (
        <div className="absolute top-20 text-center px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-500 drop-shadow-lg">
            {errorMessage}
          </h1>
          <p className="text-gray-300 text-sm md:text-lg mt-2">
            Redirecting you to your profile...
          </p>
        </div>
      )}

      {/* Form Container */}
      {!user && !isRegistered && (
        <div className="relative z-10 w-full max-w-md bg-black/10 border-2 border-amber-600/30 backdrop-blur-md text-white p-6 rounded-md rounded-b-[50px] shadow-lg mx-4 md:mx-0">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          {message && <p className="text-red-500 text-center mb-4">{message}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-white font-extralight text-base">
            {/* Username Field */}
            <div className="relative">
              <input
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full p-2 border-b border-amber-500 rounded text-white bg-transparent focus:outline-none focus:ring-0 peer"
              />
              <label
                htmlFor="username"
                className="absolute left-0 top-[-10px] text-gray-400 text-sm transition-all peer-placeholder-shown:opacity-100 peer-placeholder-shown:visible peer-focus:opacity-0 peer-focus:invisible"
              >
                Username
              </label>
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

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
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character",
                  },
                })}
                className="w-full p-2 border-b border-amber-500 rounded text-white bg-transparent focus:outline-none focus:ring-0 peer"
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-[-10px] text-gray-400 text-sm transition-all peer-placeholder-shown:opacity-100 peer-placeholder-shown:visible peer-focus:opacity-0 peer-focus:invisible"
              >
                Password
              </label>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition mt-6 flex items-center justify-center"
              disabled={isLoading}
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}