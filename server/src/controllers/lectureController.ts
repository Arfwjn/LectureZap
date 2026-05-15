import type { Request, Response, NextFunction } from "express";
import { transcribeWithPython } from '../utils/transcribeAudio';
import { generateSummary } from '../utils/aiSummarizer';
import { extractAudio } from '../utils/audioExtractor';
import { prisma } from '../lib/prisma';
import path from 'path';
import fs from 'fs';

// 1. Mendapatkan semua daftar video dari Database
export async function getLectures(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allLectures = await prisma.lecture.findMany({
      orderBy: { createdAt: 'desc' } // Urutkan dari yang terbaru
    });
    res.json({ success: true, data: allLectures });
  } catch (err) {
    next(err);
  }
}

// 2. Mendapatkan detail 1 video spesifik (termasuk transkripnya)
export async function getLectureById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lecture = await prisma.lecture.findUnique({
      where: { id: req.params.id as string },
      include: { transcription: true } // Gabungkan (JOIN) dengan data teks Whisper
    });
    
    if (!lecture) {
      res.status(404).json({ success: false, message: "Lecture not found" });
      return;
    }
    res.json({ success: true, data: lecture });
  } catch (err) {
    next(err);
  }
}

// 3. Mengunggah video & Memulai proses AI di Latar Belakang
export const uploadLecture = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Tidak ada file video yang diunggah' });
      return;
    }

    const { filename, originalname, size, path: filePath } = req.file;

    const newLecture = await prisma.lecture.create({
      data: {
        title: originalname.replace(/\.[^/.]+$/, ""),
        filename: filename,
        originalName: originalname,
        size: size,
        status: 'PROCESSING',
      }
    });

    // Kirim respons instan ke frontend
    res.status(201).json({ 
      message: 'Video berhasil diunggah. AI sedang memproses di latar belakang...', 
      lectureId: newLecture.id 
    });

    // AI PIPELINE (Background Task - tidak memblokir antarmuka)
    try {
      console.log(`[AI Pipeline] Memulai ekstraksi audio untuk: ${filename}`);
      const audioPath = await extractAudio(filePath);

      console.log(`[AI Pipeline] Memulai transkripsi Whisper untuk: ${path.basename(audioPath)}`);
      const whisperResult = await transcribeWithPython(audioPath);

      console.log(`[AI Pipeline] Transkripsi selesai. Menyimpan transkrip ke database...`);
      await prisma.transcript.create({
        data: {
          lectureId: newLecture.id,
          fullText: whisperResult.text,
          segments: whisperResult.segments, 
        }
      });

      console.log(`[AI Pipeline] Memulai LLM Summarization (Ollama)...`);
      // kirimkan fullText dari Whisper ke Ollama
      const summaryResult = await generateSummary(whisperResult.text);

      console.log(`[AI Pipeline] Summarization selesai. Menyimpan ringkasan ke database...`);
      await prisma.lectureSummary.create({
        data: {
          lectureId: newLecture.id,
          content: summaryResult // Simpan objek JSON secara utuh
        }
      });

      // Update status video agar UI bisa berpindah dari "Processing" ke "Done"
      await prisma.lecture.update({
        where: { id: newLecture.id },
        data: { status: 'DONE' }
      });

      // Hapus file MP3 sisa
      if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
      }
      console.log(`[AI Pipeline] SELURUH PROSES SELESAI untuk: ${filename}`);
    } catch (aiError) {
      console.error(`[AI Pipeline Error] Gagal memproses video ${filename}:`, aiError);
      await prisma.lecture.update({
        where: { id: newLecture.id },
        data: { status: 'ERROR' }
      });
    }
  } catch (error) {
    console.error('Kesalahan Upload:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Gagal memproses unggahan video' });
    }
  }
};

// 4. Menghapus video dari Database & Menghapus file fisiknya
export async function deleteLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lecture = await prisma.lecture.findUnique({
      where: { id: req.params.id as string }
    });

    if (!lecture) {
      res.status(404).json({ success: false, message: "Lecture not found" });
      return;
    }

    // Hapus file fisik MP4 dari folder uploads
    const fileTarget = path.join(__dirname, '../../uploads/videos', lecture.filename);
    if (fs.existsSync(fileTarget)) {
      fs.unlinkSync(fileTarget);
    }

    // Hapus dari database (Data terkait di tabel lain akan otomatis terhapus karena aturan onDelete: Cascade)
    await prisma.lecture.delete({
      where: { id: req.params.id as string }
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}