import { Router } from "express";
import {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Create a new feedback
router.post("/", authMiddleware, createFeedback);

// Get all feedbacks
router.get("/", getFeedbacks);

// Update feedback by ID
router.put("/:id", authMiddleware, updateFeedback);

// Delete feedback by ID
router.delete("/:id", authMiddleware, deleteFeedback);

export default router;
