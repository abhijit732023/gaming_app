import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser"; // Import cookie-parser
import { RegisterRouter, AdminLoginRoute, Admincreate, LoginRouter, config, CreateRoom } from './index.js';

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true // Allow sending cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware
app.set('view engine', 'ejs');

app.use('/register', RegisterRouter); // Correct the app.use method
app.use('/login', LoginRouter); // Correct the app.use method
app.use('/admin/register', Admincreate); // Correct the app.use method
app.use('/admin/login', AdminLoginRoute);
app.use('/admin/create', CreateRoom);

mongoose.connect(config.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get('/login', (req, res) => {
  res.send(req.cookies);
});

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
