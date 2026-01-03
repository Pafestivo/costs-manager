/**
 * Logs service - handles business logic for logs
 */
import { Log } from '../../models/log.model.js';

export const logsService = {
  /**
   * Create a new log entry
   * @param {Object} logData - log information
   * @returns {Promise<Object>} created log
   */
  async createLog(logData) {
    const log = new Log(logData);
    return await log.save();
  },

  /**
   * Get all logs with optional filters
   * @param {Object} filters - optional filters (service, statusCode, etc.)
   * @returns {Promise<Array>} array of logs
   */
  async getAllLogs(filters = {}) {
    const query = {};
    
    if (filters.service) {
      query.service = filters.service;
    }
    if (filters.statusCode) {
      query.statusCode = parseInt(filters.statusCode);
    }
    if (filters.method) {
      query.method = filters.method.toUpperCase();
    }
    
    const limit = filters.limit ? parseInt(filters.limit) : 100;
    
    return await Log. find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
  },
};