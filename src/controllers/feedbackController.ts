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
          connect: { id: req.userId }, // Assuming `req.userId` is set by your auth middleware
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

export const updateFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, category, status } = req.body;

  try {
    const feedback = await prisma.feedback.update({
      where: { id: Number(id) },
      data: { title, description, category, status },
    });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
