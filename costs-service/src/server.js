/**
  server entry point, starts the server and connects to mongo
  loads all configurations from app.js
  nothing should really change here
 */

// Import dependencies and configuration
import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { connectMongo, disconnectMongo } from "./config/mongo.js";
import { logger } from "./logger/pino.js";

// Create the HTTP server using the Express app
const server = createServer(app);

async function start() {
  await connectMongo();
  // Connect to MongoDB and start listening on the specified port
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

    // hard-exit safety
    setTimeout(() => process.exit(1), 8000).unref();
    // Force exit if shutdown takes too long
  } catch (e) {
    logger.error({ err: e }, "shutdown_failed");
    process.exit(1);
  }
}

// Listen for termination signals and trigger shutdown
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Start the server and handle startup errors
start().catch((e) => {
  logger.error({ err: e }, "startup_failed");
  process.exit(1);
});
