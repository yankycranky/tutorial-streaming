import { Router } from "express";
import { register, login, registerV2 } from "@controllers/auth/auth.controller";

import asyncErrorHandler from "@utils/async-error.handler";

const router = Router();
router.post("/register", asyncErrorHandler(registerV2));
router.post("/login", asyncErrorHandler(login));

export default router;
