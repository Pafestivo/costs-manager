import { getAllLogs } from "../services/logs.service.js";

export async function getAllLogsController(req, res, next) {
  try {
    const logs = await getAllLogs();
    return res.json(logs);
  } catch (e) {
    return next(e);
  }
}
