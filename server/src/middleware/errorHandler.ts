import type { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status?: number;
  code?: string;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error";

  console.error(`[ERROR] ${status} — ${message}`, err.stack);

  res.status(status).json({
    success: false,
    error: { message, ...(process.env.NODE_ENV !== "production" && { stack: err.stack }) },
  });
}
