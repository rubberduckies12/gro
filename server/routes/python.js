import { Router } from "express";
import { callPython } from "../services/python-service.js";

const router = Router();

// Health check route
router.get("/python/health", (req, res) => {
  res.json({ status: "ok" });
});

// Proxy call to Python engine
router.post("/python/call", async (req, res) => {
  try {
    const { endpoint, payload } = req.body;
    const result = await callPython(endpoint, payload);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;