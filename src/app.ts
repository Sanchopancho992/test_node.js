import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import upvoteRoutes from "./routes/upvoteRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/upvotes', upvoteRoutes);

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/feedbacks", feedbackRoutes); // Feedback-related routes
app.use("/feedbacks/upvotes", upvoteRoutes); // Upvote-related routes

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
