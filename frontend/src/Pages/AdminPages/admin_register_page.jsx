import { useForm } from "react-hook-form";
import React,{ useState } from "react";
import axios from "axios";
import { useAuth } from "../../../ContextApi/contextapi";

const AdminRegister = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const{user}=useAuth()
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log(user);
    
    try {
      const response = await axios.post("http://localhost:3000/admin/register", data);
      setSuccess(true);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username" {...register("username", { required: "Username is required" })} />
      {errors.username && <p>{errors.username.message}</p>}
      
      <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
      {errors.password && <p>{errors.password.message}</p>}
      
      <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Admin registered successfully!</p>}
    </form>
  );
};

export default AdminRegister;
