import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { lectureRouter } from "./routes/lecture";
import { chatRouter } from "./routes/chat";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/lectures", lectureRouter);
app.use("/api/chat", chatRouter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "LectureZap API", version: "1.0.0" });
});

// ─── Error Handler (must be last) ─────────────────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡ LectureZap server running on http://localhost:${PORT}`);
});

export default app;
