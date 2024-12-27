import { Router } from "express";

import authV1Routes from "./auth/v1/auth.routes";
import authV2Routes from "./auth/v2/auth.routes copy";
import usersV1Routes from "./users/v1/users.routes";

const router = Router();

router.use("/v1/auth", authV1Routes);
router.use("/v2/auth", authV2Routes);
router.use("/v1/users", usersV1Routes);

export default router;
