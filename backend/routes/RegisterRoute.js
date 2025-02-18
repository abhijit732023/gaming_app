import express from "express";
import bcrypt from "bcrypt";
import createuser from "../models/createuser.js"; // Correct the import path

const RegisterRouter = express.Router();

RegisterRouter.post("/", async (req, res) => {
res.send('hello')

});

export default RegisterRouter;
