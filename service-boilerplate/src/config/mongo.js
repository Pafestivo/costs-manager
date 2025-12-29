/**
  mongo connection logic, shouldn't be changed between services
  we just need to update the connection string to the atlas in the .env
  connectMongo() and disconnectMongo() are already used in server.js so no need to worry about them
 */
import mongoose from "mongoose";
import { logger } from "../logger/pino.js";

let connected = false;

export async function connectMongo() {
  if (connected) return;

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    connected = true;
    logger.info("mongo_connected");
  } catch (e) {
    logger.error({ err: e }, "mongo_connect_failed");
    throw e;
  }
}

export async function disconnectMongo() {
  if (!connected) return;
  await mongoose.disconnect();
  connected = false;
  logger.info("mongo_disconnected");
}
