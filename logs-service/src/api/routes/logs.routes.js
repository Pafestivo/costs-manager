
/*
	This file defines the routes for log-related API endpoints.
	It maps HTTP requests to the appropriate controller functions for logs.
*/
import { Router } from "express";
import { getAllLogsController, createLogController } from "../controllers/logs.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

// Route to get all logs
router.get("/logs", asyncHandler(getAllLogsController));

// Route to create a new log
router.post("/logs", asyncHandler(createLogController));

export default router;
