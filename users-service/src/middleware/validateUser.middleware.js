/**
 * User validation middleware
 * Validates request body for creating a new user
 */

import { HttpError } from "../utils/httpError.js";

export const validateCreateUser = (req, res, next) => {
    const { id, first_name, last_name, birthday } = req.body;

    // Validate required fields
    if (!id || !first_name || !last_name || !birthday) {
        throw new HttpError(400, "Missing required user fields");
    }

    // Validate id
    if (Number.isNaN(Number(id)) || Number(id) <= 0) {
        throw new HttpError(400, "Invalid user id");
    }

    // Validation passed
    next();
};
