/**
 * About service - provides information about the development team
 */
import { developers } from '../../config/developers. js';

export const aboutService = {
  /**
   * Get developers information
   * @returns {Array} list of developers with first_name and last_name
   */
  getDevelopers() {
    // Return only first_name and last_name as required
    return developers.map(dev => ({
      first_name: dev.first_name,
      last_name: dev.last_name,
    }));
  },
};