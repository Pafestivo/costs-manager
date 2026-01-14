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
    throw new HttpError(400, "Invalid user id");
  }

  const user = await usersService.getUserById(numericId);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.status(200).json(user);
};

/**
 * Add new user
 * POST /api/users
 */
export const addUser = async (req, res) => {
  const user = await usersService.createUser(req.body);

  if (!user) {
    throw new HttpError(409, "User already exists");
  }

  res.status(201).json(user);
};
