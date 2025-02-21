import express from "express";
import RegisterRouter from "./routes/RegisterRoute.js";
import mongoose from "mongoose";
import cors from "cors";
import config from './config/config.js';
import LoginRouter from "./routes/LoginRoute.js";
// import AdminLogin from "./routes/AdminLogin.js";
import RegisterAdmin from "./routes/adminreg.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/register', RegisterRouter); // Correct the app.use method
app.use('/login', LoginRouter); // Correct the app.use method
app.use('/admin/reg', RegisterAdmin); // Correct the app.use method

mongoose.connect(config.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get('/', (req, res) => {
  res.send('Hello World');
  console.log(config.backendURL);
});

app.get('/register', (req, res) => {
  res.render('index');
});

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
