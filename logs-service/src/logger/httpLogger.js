import pinoHttp from "pino-http";
import { logger } from "./pino.js";

export const httpLogger = pinoHttp({
  logger,
});
