import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import incomeRoutes from "./routes/incomeRoutes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);


//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
