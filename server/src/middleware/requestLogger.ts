import type { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
}
