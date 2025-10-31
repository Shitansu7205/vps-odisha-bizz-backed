import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./router/auth-router.js";



dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB once here
connectDB();

app.use(cookieParser()); // ✅ very important

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

// ✅ Serve uploaded files publicly
// app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", authRouter);




// Start server
// Start server
app.listen(8000, "127.0.0.1", () => {
    console.log("Server running securely on 127.0.0.1:8000....");
});

