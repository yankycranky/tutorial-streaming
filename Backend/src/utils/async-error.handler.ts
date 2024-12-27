import { NextFunction, Response, Request, Handler } from "express";

const asyncErrorHandler = (fn: Handler): Handler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

export default asyncErrorHandler;
