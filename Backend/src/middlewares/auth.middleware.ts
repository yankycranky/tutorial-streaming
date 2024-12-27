import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthError extends Error {
  status: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 400;
    this.message = this.message || "Bad Request";
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"] || req.headers["Authorization"];
  if (!token) return next(new AuthError("Missing authorization header", 400));

  console.log(token);
  let bearerToken = null;
  if (token instanceof String) {
    bearerToken = token.split(":")?.[1];
  }
  if (Array.isArray(token)) {
    bearerToken = token?.[0]?.split(":")?.[1];
  }

  if (!bearerToken) return next(new AuthError("Invalid token", 400));
  
  // jwt.sign()

  
  return next(new AuthError("Invalid Bearer token", 400));
};
