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

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/upvoteS", upvoteRoutes);
app.use("/feedbacks", feedbackRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
