import { Router } from "express";
import { signup, login, getProfile, loginWithApple, loginWithGoogle } from "../services/auth-service.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

// Email/password signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const token = await signup(email, password, first_name, last_name);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Email/password login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Apple Sign-In
router.post("/apple", async (req, res) => {
  try {
    const { idToken } = req.body;
    const token = await loginWithApple(idToken);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Google Sign-In
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    const token = await loginWithGoogle(idToken);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Get current user profile (JWT required)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await getProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;