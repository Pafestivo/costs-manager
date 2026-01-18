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
 * @param {number} customId - Optional custom ID for the user
 * @returns created user
 */
export const createUser = async (userData, customId) => {
  // Use custom ID if provided, otherwise generate next available ID
  let nextId;
  if (customId !== undefined) {
    nextId = Number(customId);
  } else {
    const lastUser = await User.findOne()
      .sort({ id: -1 })
      .limit(1)
      .lean()
      .exec();
    nextId = lastUser ? lastUser.id + 1 : 1;
  }

  // Parse birthday if it's a string in DD/MM/YYYY format
  let birthday = userData.birthday;
  if (typeof birthday === "string") {
    // Try to parse DD/MM/YYYY format
    const parts = birthday.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      // Create date in YYYY-MM-DD format for proper parsing
      birthday = new Date(`${year}-${month}-${day}`);
    } else {
      // Fallback to default Date parsing
      birthday = new Date(birthday);
    }
  }

  const user = new User({
    ...userData,
    id: nextId,
    birthday,
  });
  return user.save();
};
