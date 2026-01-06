import { Router } from "express";
import logsRoutes from "./logs.routes.js";

const router = Router();

router.use(logsRoutes);

export default router;
