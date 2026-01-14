/**
 * About controller - handles requests for system information
 */
import { aboutService } from './about.service.js';

export const aboutController = {
  /**
   * GET /api/about - get developers information
   */
  async getAbout(req, res) {
    const developers = aboutService.getDevelopers();
    res.status(200).json(developers);
  },
};