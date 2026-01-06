import { Router } from "express";
import { getAllLogsController } from "../controllers/logs.controller.js";

const router = Router();
router.get("/logs", getAllLogsController);

export default router;
