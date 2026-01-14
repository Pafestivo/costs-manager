
/*
  This file provides service functions for interacting with the logs collection in the database.
  It includes methods to fetch all logs and create new log entries.
*/
import { LogModel } from "../../models/logs.model.js";


// Get all logs from the database
export async function getAllLogs() {
  // Fetch all logs from the database, sorted by timestamp descending
  return LogModel.find().sort({ timestamp: -1 }).lean();
}


// Create a new log entry in the database
export async function createLog(logData) {
  // Create a new log entry
  return LogModel.create(logData);
}
