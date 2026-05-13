import { Router } from "express";
import { sendChatMessage, getChatHistory } from "../controllers/chatController";

export const chatRouter = Router();

// POST /api/chat/:lectureId   — send a message (RAG query)
chatRouter.post("/:lectureId", sendChatMessage);

// GET  /api/chat/:lectureId   — get full chat history
chatRouter.get("/:lectureId", getChatHistory);
