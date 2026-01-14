
/*
  This file sets up the in-memory MongoDB server for tests.
  It handles database connection, cleanup, and teardown for test isolation.
*/
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo;

// Start in-memory MongoDB before all tests
beforeAll(async () => {
  mongo = await MongoMemoryServer.create({
    binary: {
      version: "6.0.13",
    },
  });

  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

// Clean up collections after each test
afterEach(async () => {
  if (!mongoose.connection?.db) return;

  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// Disconnect and stop MongoDB after all tests
afterAll(async () => {
  try {
    await mongoose.disconnect();
  } finally {
    if (mongo) await mongo.stop();
  }
});
