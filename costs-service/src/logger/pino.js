/**
  standard pino configuration, used in httpLogger and errorMiddleware
  shouldn't really be changed, works as is
 */
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: { service: process.env.SERVICE_NAME },
});
