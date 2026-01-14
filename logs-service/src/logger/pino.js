
/*
  This file configures the pino logger for the logs service.
  It sets the logging level based on environment variables.
*/
import pino from "pino";

// Logger instance
export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});
