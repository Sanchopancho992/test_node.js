import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get current user
router.get("/me", authMiddleware, getMe);

export default router;
