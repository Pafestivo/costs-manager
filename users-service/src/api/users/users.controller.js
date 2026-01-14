/**
 * Users controller
 * Handles HTTP requests related to users
 */

import { HttpError } from "../../utils/httpError.js";
import * as usersService from "./users.service.js";

/**
 * Get all users
 * GET /api/users
 */
export const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers();
  res.status(200).json(users);
};

/**
 * Get user by id
 * GET /api/users/:id
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (Number.isNaN(numericId) || numericId <= 0) {
    throw new HttpError({
      status: 400,
      id: "INVALID_USER_ID",
      message: "Invalid user id",
      expose: true
    });
  }

  const user = await usersService.getUserById(numericId);

  if (!user) {
    throw new HttpError({
      status: 404,
      id: "USER_NOT_FOUND",
      message: "User not found",
      expose: true
    });
  }

  res.status(200).json(user);
};

/**
 * Add new user
 * POST /api/users
 */
export const addUser = async (req, res) => {
  const { id, ...userData } = req.body;
  
  // If custom ID is provided, validate it
  if (id !== undefined) {
    const numericId = Number(id);
    if (Number.isNaN(numericId) || numericId <= 0) {
      throw new HttpError({
        status: 400,
        id: "INVALID_USER_ID",
        message: "Invalid user id",
        expose: true
      });
    }
    
    // Check if ID is already taken
    const existingUser = await usersService.getUserById(numericId);
    if (existingUser) {
      throw new HttpError({
        status: 409,
        id: "USER_ID_EXISTS",
        message: "User ID already exists",
        expose: true
      });
    }
  }

  const user = await usersService.createUser(userData, id);

  if (!user) {
    throw new HttpError({
      status: 409,
      id: "USER_EXISTS",
      message: "User already exists",
      expose: true
    });
  }

  res.status(201).json(user);
};
