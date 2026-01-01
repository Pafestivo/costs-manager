/**
  logger service for http requests
  nothing that should be messed with, its imported and used in app.js as a middleware and will just work for you
 */
import pinoHttp from "pino-http";
import { logger } from "./pino.js";

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
