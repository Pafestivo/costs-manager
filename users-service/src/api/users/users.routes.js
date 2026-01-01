/**
 * Users routes
 * defines users related endpoints
 */

import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    addUser,
} from "./users.controller.js";
import { validateAddUser } from "./users.validation.js";


const router = Router();

// GET /api/users
router.get("/", getAllUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// POST /api/users/add
router.post("/add", validateAddUser, addUser);

export default router;
