
/*
  This file contains controller functions for handling HTTP requests related to logs.
  It provides endpoints to fetch all logs and create new log entries.
*/
import { getAllLogs, createLog } from "../services/logs.service.js";


// Controller to get all logs
export async function getAllLogsController(req, res) {
  const logs = await getAllLogs();
  // Respond with all logs
  return res.status(200).json(logs);
}


// Controller to create a new log
export async function createLogController(req, res) {
  const log = await createLog(req.body);
  // Respond with the created log
  return res.status(201).json(log);
}
