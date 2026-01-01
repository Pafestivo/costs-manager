/**
 * HTTP logger middleware for COSTS microservice
 * logs all HTTP requests using Pino
 * note: log persistence is handled by the LOGS microservice
 */
import pinoHttp from "pino-http";
import { logger } from "./pino.js";

// create HTTP logger middleware
export const httpLogger = pinoHttp({
  logger,
  customLogLevel(res, err) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  serializers: {
    req(req) {
      return { method: req.method, url: req.url };
    },
    res(res) {
      return { statusCode: res.statusCode };
    },
  },
});
