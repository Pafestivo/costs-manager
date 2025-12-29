/**
 added health controller to serve as a boilerplate for you to copy for your own controllers
 to add another controller, create a new file in this directory and follow this pattern
 */
import { healthService } from "../services/health.service.js";

export const healthController = {
  async getHealth(_req, res) {
    const data = await healthService.status();
    res.json(data);
  },
};
