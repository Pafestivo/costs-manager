/**
 * main API routes configuration for COSTS microservice
 * all routes are prefixed with /api
 */
import { Router } from "express";
import costsRoutes from "./costs.routes.js";

const router = Router();

// costs endpoints (add and report)
router.use("/", costsRoutes);

export default router;
