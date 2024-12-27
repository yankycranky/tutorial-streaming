import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { HTTP_STATUS } from "src/constants/http.status";

import { ZodError } from "zod";

const handleZodError = (res: Response, err: ZodError) => {
  const errors = err.issues.map((error) => ({
    path: error.path.join("."),
    message: error.message,
  }));

  res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Bad Request", errors });
};

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("your error", err);

  if (err instanceof ZodError) {
    return handleZodError(res, err);
  }
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).send({ status: "failed", errors: { message: message } });
};

export default errorHandler;
