import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../ContextApi/contextapi";


const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login, user } = useAuth();

  const onSubmit = async (data) => {
    try {
      login(data)
      console.log(user);
      
      const response = await axios.post("http://localhost:3000/admin/login", data);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      // Store user details or token if needed
      console.log("User Data:", response.data.user);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Admin Login</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="text-white">Email</label>
            <input 
              type="email" 
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-white">Password</label>
            <input 
              type="password" 
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
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

export default AdminLogin;
