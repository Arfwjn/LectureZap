import { Router } from "express";
import { uploadLecture, getLectures, getLectureById, deleteLecture } from "../controllers/lectureController";
import { upload } from "../middleware/upload";

export const lectureRouter = Router();

// GET  /api/lectures          — list all lectures
lectureRouter.get("/", getLectures);

// GET  /api/lectures/:id      — get single lecture with summary + timestamps
lectureRouter.get("/:id", getLectureById);

// POST /api/lectures/upload   — upload MP4, triggers transcription + OCR
lectureRouter.post("/upload", upload.single("video"), uploadLecture);

// DELETE /api/lectures/:id    — delete a lecture project
lectureRouter.delete("/:id", deleteLecture);
