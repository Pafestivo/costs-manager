import { LogModel } from "../../models/logs.model.js";

export async function getAllLogs() {
  // Fetch all logs from the database, sorted by timestamp descending
  return LogModel.find().sort({ timestamp: -1 }).lean();
}
