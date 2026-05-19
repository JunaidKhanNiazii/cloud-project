import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:8080"] }));
app.use(express.json());

// Health check
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
