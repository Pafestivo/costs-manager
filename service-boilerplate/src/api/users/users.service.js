/**
 * Users service
 * contains users business logic
 */

import { User } from "../../models/user.model.js";
import { getTotalCostByUserId } from "../costs/costs.service.js";


//get all users
export async function getAllUsers() {
    return await User.find({});
}

 //get single user by id
export async function getUserById(id) {
    const user = await User.findOne({ id });

    if (!user) {
        throw {
            id: "USER_NOT_FOUND",
            message: "user not found",
        };
    }

    const total = await getTotalCostByUserId(id);

    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        total,
    };
}

//create new user
export async function createUser(userData) {
    const existingUser = await User.findOne({ id: userData.id });
    if (existingUser) {
        throw {
            id: "USER_ALREADY_EXISTS",
            message: "user with this id already exists",
        };
    }
    const user = new User(userData);
    return await user.save();
}

