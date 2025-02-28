import express from "express";
import AdminRegisterModel from "../../models/Admin/createadmin.js";
import mongoose from "mongoose";
const Admincreate=express.Router();
Admincreate.use(express.json());
Admincreate.use(express.urlencoded({ extended: true }));


Admincreate.post('/',async (req,res)=>{
    const {username,email,password}=req.body
    const user=await AdminRegisterModel.create({
        username,
        email,
        password    
    })
})


export default Admincreate;
