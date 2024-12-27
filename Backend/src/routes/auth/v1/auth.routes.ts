import { Router } from "express";
import { register, login } from "@controllers/auth/auth.controller";

import asyncErrorHandler from "@utils/async-error.handler";
import { authMiddleware } from "@middlewares/auth.middleware";

const router = Router();
router.post("/register", authMiddleware, asyncErrorHandler(register));
router.post("/login", asyncErrorHandler(login));

export default router;
