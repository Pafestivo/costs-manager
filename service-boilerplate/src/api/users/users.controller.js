/**
 * Users controller
 * handles users related HTTP requests
 */

import * as usersService from "./users.service.js";

export async function getAllUsers(req, res) {
    const users = await usersService.getAllUsers();
    res.json(users);
}

export async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        const user = await usersService.getUserById(Number(id));
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function addUser(req, res, next) {
    try {
        const user = await usersService.createUser(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
}
