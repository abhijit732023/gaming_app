import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AdminLoginModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
  },
  { timestamps: true }
);

// Hash password before saving


const User = mongoose.model("Admin-Login", AdminLoginModel);

export default AdminLoginModel;
// Compare this snippet from frontend/src/Allpaths/allpath.js: