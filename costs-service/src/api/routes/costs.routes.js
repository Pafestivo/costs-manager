/**
 * cost-related routes
 * handles endpoints for adding costs and generating reports
 */
import express from "express";
import * as costsController from "../controllers/costs.controller.js";

const router = express.Router();

// POST /api/add - Add new cost item
router.post("/add", costsController.addCost);

// GET /api/report - Get monthly report
// Query params: id (userid), year, month
router.get("/report", costsController.getMonthlyReport);

export default router;
