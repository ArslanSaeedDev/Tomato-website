import express from "express";
import cors from "cors";
import { connectDb } from "../config/db.js";
import foodRouter from "../routes/foodRoute.js";
import userRouter from "../routes/userRoute.js";
import "dotenv/config";
import serverless from "serverless-http";

// Connect to database (only once per cold start)
connectDb();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://tomato-website-two.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("upload")); // Static file serving

app.get("/", (req, res) => {
  res.send("API is working from Vercel Serverless Function");
});

// Export handler for Vercel
export default serverless(app);
