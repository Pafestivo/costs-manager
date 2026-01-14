/**
 * Users routes
 * Defines HTTP endpoints related to users
 */

import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    addUser,
} from "./users.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateCreateUser } from "../../middleware/validateUser.middleware.js";

const router = Router();

/**
 * Get all users
 * GET /api/users
 */
router.get("/", asyncHandler(getAllUsers));

/**
 * Get user by id
 * GET /api/users/:id
 */
router.get("/:id", asyncHandler(getUserById));

/**
 * Create new user
 * POST /api/users
 */
router.post("/", validateCreateUser, asyncHandler(addUser));

export default router;
