// logs-service/src/middleware/dbRequestLogger.middleware.js
import { LogModel } from "../models/logs.model.js";

export function dbRequestLogger(serviceName) {
  return function (req, res, next) {
    res.on("finish", async () => {
      try {
        await LogModel.create({
          service: serviceName,
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
          message: res.statusMessage || "",
        });
      } catch (e) {
     
      }
    });

    next();
  };
}
