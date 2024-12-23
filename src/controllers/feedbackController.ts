import { Request, Response } from "express";
import prisma from "../utils/prisma";

export enum Category {
  BUG = "BUG",
  FEATURE = "FEATURE",
  ENHANCEMENT = "ENHANCEMENT",
  OTHER = "OTHER",
}

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

export const getFeedbacks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category, page = 1, limit = 10 } = req.query;

  try {
    const skip = (Number(page) - 1) * Number(limit);

    // Log the incoming category parameter
    console.log("Category parameter received:", category);

    // Validate and parse the category parameter
    const whereClause: { category?: Category } = {};
    if (category && Object.values(Category).includes(category as Category)) {
      whereClause.category = category as Category;
    } else if (category) {
      // If the category is invalid, return an empty array
      console.log("Invalid category provided:", category);
      res.status(200).json({
        feedbacks: [],
        totalPages: 0,
        currentPage: Number(page),
      });
      return; // Early return to avoid further processing
    }

    // Log the constructed whereClause
    console.log("Where clause for query:", whereClause);

    const feedbacks = await prisma.feedback.findMany({
      where: whereClause,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" }, // Sorting by latest
    });

    const totalFeedbacks = await prisma.feedback.count({ where: whereClause });

    res.status(200).json({
      feedbacks,
      totalPages: Math.ceil(totalFeedbacks / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
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
