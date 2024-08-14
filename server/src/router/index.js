import { Router } from "express";
import AuthRouter from "./authRouter.js";

const router = Router();

router.use("/auth", AuthRouter);

export default router;