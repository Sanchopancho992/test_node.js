import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const createFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, category, status } = req.body;

  if (!title || !description || !category || !status) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        title,
        description,
        category,
        status,
        author: {
          connect: { id: req.userId },
        },
      },
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  // Check if id is a valid number
  const feedbackId = Number(id);
  if (isNaN(feedbackId)) {
    res.status(400).json({ message: "Invalid feedback ID" });
    return; // Ensure we return here to avoid further execution
  }

  const { title, description, category, status } = req.body;

  // Validate input
  if (!title || !description || !category || !status) {
    res.status(400).json({ message: "All fields are required" });
    return; // Ensure we return here to avoid further execution
  }

  try {
    const feedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: { title, description, category, status },
    });

    res.status(200).json(feedback);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating feedback:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({
        message: "Server error",
        error: "An unexpected error occurred.",
      });
    }
  }
};
export const deleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.feedback.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
