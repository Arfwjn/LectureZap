import type { Request, Response, NextFunction } from "express";

interface ChatMessage {
  id: string;
  lectureId: string;
  role: "user" | "ai";
  content: string;
  timestamp?: string;
  createdAt: Date;
}

// In-memory chat store (replace with DB in production)
const chatHistory: Record<string, ChatMessage[]> = {};

export async function getChatHistory(req: Request, res: Response): Promise<void> {
  const { lectureId } = req.params;
  res.json({ success: true, data: chatHistory[lectureId] ?? [] });
}

export async function sendChatMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { lectureId } = req.params;
    const { message } = req.body as { message: string };

    if (!message?.trim()) {
      res.status(400).json({ success: false, message: "Message cannot be empty" });
      return;
    }

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      lectureId,
      role: "user",
      content: message.trim(),
      createdAt: new Date(),
    };

    if (!chatHistory[lectureId]) chatHistory[lectureId] = [];
    chatHistory[lectureId].push(userMsg);

    // TODO: integrate RAG pipeline
    // const aiResponse = await ragService.query(lectureId, message);
    const aiMsg: ChatMessage = {
      id: crypto.randomUUID(),
      lectureId,
      role: "ai",
      content: `[RAG response placeholder] You asked: "${message}"`,
      createdAt: new Date(),
    };

    chatHistory[lectureId].push(aiMsg);
    res.json({ success: true, data: { userMessage: userMsg, aiMessage: aiMsg } });
  } catch (err) {
    next(err);
  }
}
