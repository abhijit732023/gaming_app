import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../ContextApi/contextapi";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../images/login.webp"; // Adjust the path as needed
import { Loading, ENV_File, Header, MobileMenu } from "../../FilesPaths/allpath.js"; // Import the header and mobile menu components

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add state for loader

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      setErrorMessage("You are already logged in. Please logout first to access the login page.");
      setTimeout(() => {
        navigate("/profile"); // Redirect to the profile page or another appropriate page
      }, 3000);
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    if (user) {
      // Show error if the user is already logged in
      setErrorMessage("You are already logged in. Please logout first to access the login page.");
      return;
    }

    console.log("Submitting data:", data.email);

    try {
      const response = await axios.post(`${ENV_File.backendURL}/login`, data, {
        withCredentials: true, // Include credentials (cookies) in the request to successfully create cookies
      });
      setSuccessMessage(response.data.message);
      login(response.data.user);
      setErrorMessage("");
      setIsLoading(true); // Show loader
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
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

      {/* Header for Desktop */}
      <div className="hidden md:block absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Mobile Menu */}
      <div className="block md:hidden absolute top-0 left-0 w-full z-20">
        <MobileMenu />
      </div>

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

      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <Loading size="80" speed="2" color="#B9F0DA"></Loading>
        </div>
      )}

      {/* Login Form */}
      {!user && (
        <div
          className={`relative bg-black/20 border-2 border-yellow-500/30  backdrop-blur-md p-6 rounded-md rounded-b-[50px] shadow-lg w-full max-w-md mx-4 md:mx-0 z-10 ${
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
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
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
      )}
    </div>
  );
};

export default Login;