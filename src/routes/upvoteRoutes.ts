// src/routes/upvoteRoutes.ts
import { Router } from "express";
import { upvoteFeedback, getUpvotes } from "../controllers/upvoteController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/:feedbackId/upvote", authMiddleware, upvoteFeedback);
router.get("/:feedbackId/upvote", getUpvotes);

export default router;
