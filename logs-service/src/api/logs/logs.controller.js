/**
 * Logs controller - handles HTTP requests for logs
 */
import { logsService } from './logs.service.js';

export const logsController = {
  /**
   * GET /api/logs - get all logs
   */
  async getLogs(req, res) {
    const filters = {
      service: req.query. service,
      statusCode: req.query.statusCode,
      method: req.query.method,
      limit: req.query.limit,
    };
    
    const logs = await logsService.getAllLogs(filters);
    res.status(200).json(logs);
  },

  /**
   * POST /api/logs - create a new log entry
   */
  async createLog(req, res) {
    const logData = {
      timestamp: req.body.timestamp || new Date(),
      service: req. body.service,
      method: req.body.method,
      path: req.body.path,
      statusCode: req.body.statusCode,
      durationMs: req.body.durationMs,
      message: req. body.message,
      userId: req.body.userId,
      error: req.body.error,
    };
    
    const log = await logsService.createLog(logData);
    res.status(201).json(log);
  },
};