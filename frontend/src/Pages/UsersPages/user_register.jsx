import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../ContextApi/contextapi";
import BgImage from "../images/register.jpg"; // Add your background image path
import { Loading } from "../../FilesPaths/allpath.js"; // Import Loading component

export default function UserRegister() {
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [showLoading, setShowLoading] = useState(false); // Track Loading component visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    console.log("Submitting data:", data); // Log the data being submitted
    setShowLoading(true); // Show Loading component
    setIsLoading(true); // Set loading state to true

    setTimeout(async () => {
      try {
        const response = await axios.post("http://localhost:3000/register", data);
        console.log("User registered:", response.data);
        setMessage("User registered successfully!");
        setIsRegistered(true); // Set registration status to true
        setShowLoading(false); // Hide Loading component
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 3 seconds
        }, 3000);
      } catch (error) {
        setShowLoading(false); // Hide Loading component
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
        setIsLoading(false); // Set loading state to false
      }
    }, 2000); // Show Loading component for 2 seconds
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Loader Overlay */}
      {showLoading && (
        <div className="absolute inset-0 bg-black opacity-60 flex items-center justify-center z-50">
          <Loading /> {/* Show Loading component */}
        </div>
      )}

      {/* Attracting Text */}
      <div className="absolute top-10 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-500 drop-shadow-lg">
          Gear up. Squad up. Sign up.
        </h1>
        <p className="text-gray-300 text-lg mt-2">
          Join the ultimate gaming community today!
        </p>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-black/30 backdrop-blur-md text-white p-6 rounded-lg shadow-lg">
        {isRegistered ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">🎉 Congratulations!</h2>
            <p className="text-gray-300">
              You have successfully registered. Redirecting to the login page...
            </p>
          </div>
        ) : (
          <>
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
                  {...register("password", { required: "Password is required" })}
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
                disabled={isLoading} // Disable button while loading
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
          </>
        )}
      </div>
    </div>
  );
}