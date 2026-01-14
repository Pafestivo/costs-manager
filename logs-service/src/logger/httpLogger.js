
/*
  This file sets up the HTTP logger middleware using pino-http.
  It provides logging for incoming HTTP requests in the logs service.
*/
import pinoHttp from "pino-http";
import { logger } from "./pino.js";

// HTTP logger middleware
export const httpLogger = pinoHttp({
  logger,
});
