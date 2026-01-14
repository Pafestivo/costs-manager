/**
 * User validation middleware
 * Validates request body for creating a new user
 */

import { HttpError } from "../utils/httpError.js";

export const validateCreateUser = (req, res, next) => {
  const { first_name, last_name, birthday } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !birthday) {
    throw new HttpError(400, "Missing required user fields");
  }

  // Validation passed
  next();
};
