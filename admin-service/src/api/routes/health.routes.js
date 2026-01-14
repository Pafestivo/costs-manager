/**
 same as with the controller, i added a placeholder route file to serve as a boilerplate for you to copy for your own routes
 to add another route, create a new file in this directory and follow this pattern
 make sure to also add the new route to the routes index file
 */
import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { healthController } from "../controllers/health.controller.js";

const router = Router();

router.get("/", asyncHandler(healthController.getHealth));

export default router;
