import { useForm } from "react-hook-form"; 
import axios from "axios"; 
import React, { useState } from "react"; 
import { useAuth } from "../../../ContextApi/contextapi"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const { user, login,loggingIn } = useAuth();
  const navigate = useNavigate(); // Get the navigate function

  const onSubmit = async (data) => { 
    console.log("Submitting data:", data.email); 
    console.log('heyy', user); 
    
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post("http://localhost:3000/login", data); 
      // Set the success message from the response
      setSuccessMessage(response.data.message); 
      login(response.data.user);
      // Clear any previous error messages
      setErrorMessage("");       
      console.log('log state',loggingIn);
      
      if (login) {
        setTimeout(() => {
          navigate('/profile'); // Navigate to the profile page after 5 seconds
        }, 5000);
      }
    } catch (error) { 
      // Clear any previous success messages
      setSuccessMessage(""); 
      // Set the error message from the response or a default message
      setErrorMessage(error.response?.data?.message || "Login failed"); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900"> 
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"> 
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Login</h2> 
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>} 
        {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>} 
        {loggingIn && <p className="text-blue-500 text-sm mb-2">Logging in...</p>} {/* Display "Logging in..." message */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> 
          <div>
            <label className="text-white">Email</label>
            <input 
              type="email" 
              {...register("email", { required: "Email is required" })} 
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>} 
          </div>

          <div>
            <label className="text-white">Password</label>
            <input 
              type="password" 
              {...register("password", { required: "Password is required" })} 
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>} 
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;