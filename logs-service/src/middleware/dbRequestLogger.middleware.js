
/*
  This middleware logs each HTTP request to the database after the response is sent.
  It creates a log entry with service name, method, URL, status, and message.
*/
import { LogModel } from "../models/logs.model.js";


// Middleware to log requests
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
        // Error while logging request
      }
    });

    // Continue to next middleware
    next();
  };
}
