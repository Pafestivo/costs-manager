import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({
    binary: {
  
      version: "6.0.13",
    },
  });

  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {

  if (!mongoose.connection?.db) return;

  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
  } finally {
    if (mongo) await mongo.stop();
  }
});
