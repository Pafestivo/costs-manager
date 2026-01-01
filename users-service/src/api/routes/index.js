/**
 this is the routes index, whenever you create a new route file in this directory you should import and use it here
 follow the pattern below
 */
import { Router } from "express";
import healthRoutes from "./health.routes.js";
import usersRoutes from "../users/users.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/users", usersRoutes);

export default router;
