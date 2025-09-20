import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

// Import routers
import authRouter from "./routes/auth.js";
import pythonRouter from "./routes/python.js";
// Add other routers as needed

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database pool
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add other Pool options if needed
});

app.use(express.json());

// Mount routers
app.use("/auth", authRouter);
app.use("/", pythonRouter);
// Add other routers here

app.get("/", (req, res) => {
  res.json({ status: "Gro Node backend running!" });
});

app.listen(port, () => {
  console.log(`Gro Node server listening on port ${port}`);
});