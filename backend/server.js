import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from './routes/userRoute.js';
import "dotenv/config"

//app config
const app = express();
const port = process.env.PORT || 4000;



//middleware
app.use(express.json()); //send message from Frontend to backend
app.use(cors({
  origin: "https://tomato-website-two.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// Connect to database
connectDb();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

// Serve images from the 'upload' folder
app.use("/images", express.static("upload"));

// Test endpoint
app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
