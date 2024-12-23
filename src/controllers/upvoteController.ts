import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const upvoteFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const feedbackId = parseInt(req.params.feedbackId, 10); // Parse feedbackId as an integer

  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized: userId is missing" });
    return;
  }

  if (isNaN(feedbackId)) {
    res.status(400).json({ message: "Invalid feedbackId" });
    return;
  }

  try {
    // Ensure the feedback exists
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!feedback) {
      res.status(404).json({ message: "Feedback not found" });
      return;
    }

    // Check if the user has already upvoted this feedback
    const existingUpvote = await prisma.upvote.findFirst({
      where: {
        feedbackId,
        userId: req.userId,
      },
    });

    if (existingUpvote) {
      res
        .status(400)
        .json({ message: "You have already upvoted this feedback" });
      return;
    }

    // Create the upvote
    const upvote = await prisma.upvote.create({
      data: {
        feedbackId,
        userId: req.userId,
      },
    });

    res.status(201).json(upvote);
  } catch (error) {
    console.error("Error creating upvote:", error); // Log error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUpvotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const feedbackId = parseInt(req.params.feedbackId, 10); // This should be req.params.feedbackId

  if (isNaN(feedbackId)) {
    res.status(400).json({ message: "Invalid feedback ID" });
    return;
  }

  try {
    const upvotes = await prisma.upvote.findMany({
      where: { feedbackId },
    });
    res.status(200).json(upvotes);
  } catch (error) {
    console.error("Error retrieving upvotes:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
