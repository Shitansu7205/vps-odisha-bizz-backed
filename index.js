import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./config/db.js";
import authRouter from "./router/auth-router.js";



dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB once here
// connectDB();



app.use(cors());
app.use(express.json());



// Routes
app.use("/api/auth", authRouter);




// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
