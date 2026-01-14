
/*
	This file sets up the main API router for the logs service.
	It combines all log-related routes into a single router for use in the app.
*/
import { Router } from "express";
import logsRoutes from "./logs.routes.js";

const router = Router();

// Use log routes
router.use(logsRoutes);

export default router;
