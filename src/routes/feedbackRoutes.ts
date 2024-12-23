// src/routes/feedbackRoutes.ts
import { Router } from 'express';
import {
    createFeedback,
    getFeedbacks,
    updateFeedback,
    deleteFeedback,
} from '../controllers/feedbackController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createFeedback);
router.get('/', getFeedbacks);
router.put('/:id', authMiddleware, updateFeedback);
router.delete('/:id', authMiddleware, deleteFeedback);

export default router;