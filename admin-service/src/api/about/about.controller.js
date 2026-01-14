/**
 * About controller - handles requests for system information
 */
import { createLog } from "../../utils/createLog.js";
import { aboutService } from "./about.service.js";

export const aboutController = {
  /**
   * GET /api/about - get developers information
   */
  async getAbout(req, res) {
    const developers = aboutService.getDevelopers();

    try {
      await createLog(
        "admin-service",
        "GET",
        "/api/about",
        200,
        JSON.stringify(developers)
      );
    } catch (error) {
      console.error("Failed to create log:", error.message);
    }

    res.status(200).json(developers);
  },
};
