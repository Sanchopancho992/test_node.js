import { Router } from "express";
import { upvoteFeedback, getUpvotes } from "../controllers/upvoteController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Upvote a feedback by ID
router.post("/:feedbackId/upvote", authMiddleware, upvoteFeedback);

// Get all upvotes for a specific feedback
router.get("/:feedbackId/upvote", getUpvotes);

export default router;
