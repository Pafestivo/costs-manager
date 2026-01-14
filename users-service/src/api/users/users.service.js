/**
 * Users service
 * Handles users business logic and database access
 */

import { User } from "../../models/user.model.js";

/**
 * Get all users from database
 */
export const getAllUsers = async () => {
    return await User.find({}).lean().exec();
};



/**
 * Get user by id from database
 * @param {number} id
 * @returns user object or null
 */
export const getUserById = async (id) => {
    return await User.findOne({ id }).lean().exec();
};


/**
 * Create a new user
 * @param {object} userData
 * @returns created user
 */
export const createUser = async (userData) => {
    const existingUser = await User.findOne({ id: userData.id });

    // If user already exists, return null
    if (existingUser) {
        return null;
    }

    const user = new User(userData);
    return user.save();
};
