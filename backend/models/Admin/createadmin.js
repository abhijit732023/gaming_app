import mongoose, { Schema } from "mongoose";

const createAdmin = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const AdminRegisterModel = mongoose.model('AdminRegister', createAdmin);

export default AdminRegisterModel;