const app = require('./app');

// logs-service/src/server.js
import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { connectMongo, disconnectMongo } from "./config/mongo.js";
import { logger } from "./logger/pino.js";

const server = createServer(app);

async function start() {
  await connectMongo();
  server.listen(process.env.PORT, () => {
    logger.info(
      {
        service: process.env.SERVICE_NAME,
        port: process.env.PORT,
        env: process.env.NODE_ENV,
      },
      "service_started"
    );
  });
}

async function shutdown(signal) {
  try {
    logger.warn({ signal }, "shutdown_started");
    await disconnectMongo();
    server.close(() => {
      logger.warn("shutdown_complete");
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 8000).unref();
  } catch (e) {
    logger.error({ err: e }, "shutdown_failed");
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start().catch((e) => {
  logger.error({ err: e }, "startup_failed");
  process.exit(1);
});
