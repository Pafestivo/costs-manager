import mongoose from "mongoose";
import { logger } from "../logger/pino.js";

let connected = false;

export const connectMongo = async () => {
  if (connected) return;

  mongoose.set("strictQuery", true);

  // use test database when running tests
  const mongoUri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TEST || process.env.MONGO_URI
      : process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    connected = true;
    logger.info("mongo_connected");
  } catch (e) {
    logger.error({ err: e }, "mongo_connect_failed");
    throw e;
  }
};

export const disconnectMongo = async () => {
  if (!connected) return;
  await mongoose.disconnect();
  connected = false;
  logger.info("mongo_disconnected");
};
