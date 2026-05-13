import type { Request, Response, NextFunction } from "express";
import type { Lecture } from "../models/lecture";

// In-memory store (replace with DB in production)
const lectures: Lecture[] = [];

export async function getLectures(_req: Request, res: Response): Promise<void> {
  res.json({ success: true, data: lectures });
}

export async function getLectureById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lecture = lectures.find((l) => l.id === req.params.id);
    if (!lecture) {
      res.status(404).json({ success: false, message: "Lecture not found" });
      return;
    }
    res.json({ success: true, data: lecture });
  } catch (err) {
    next(err);
  }
}

export async function uploadLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No video file provided" });
      return;
    }

    const newLecture: Lecture = {
      id: crypto.randomUUID(),
      title: req.body.title ?? req.file.originalname,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      status: "processing",
      timestamps: [],
      summary: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    lectures.push(newLecture);

    // TODO: trigger transcription + OCR pipeline
    // await transcriptionService.process(newLecture.id, req.file.path);

    res.status(201).json({ success: true, data: newLecture });
  } catch (err) {
    next(err);
  }
}

export async function deleteLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const index = lectures.findIndex((l) => l.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: "Lecture not found" });
      return;
    }
    lectures.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
