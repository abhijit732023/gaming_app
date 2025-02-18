import express from "express";
import RegisterRouter from "./routes/RegisterRoute.js";
// import mongoose from "mongoose";
// import cors from "cors";
// import config from './config.js
const app = express()

import config from './config/config.js';
import ejs from 'ejs'
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/register', RegisterRouter); // Correct the app.use method

// import dotenv from "dotenv";
// dotenv.config();


// Import routes
// import authRoutes from "./routes/authRoutes.js";
// import tournamentRoutes from "./routes/tournamentRoutes.js";

// Load environment variables

// const app = express();
// const PORT = config.port || 5000;

// // Middleware
// app.use(express.json()); // Parse JSON bodies
// app.use(cors()); // Allow frontend to communicate with backend

// // Connect to MongoDB Atlas
// mongoose.connect(config.backendURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // Routes
// app.use("/api/auth", authRoutes); // Authentication routes

// // Default route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Gaming Tournament API");
// });

// // Start the server
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

app.get('/',(req,res)=>{
  res.send('Hello World')
  console.log(config.backendURL)
})

app.get('/register',(req,res)=>{
  res.render('index')
})
app.listen(3000)
