/**
  test file example for the boilerplate health endpoint
  to add your own tests create a new file in this directory following the name pattern and write your own tests
  make sure to write tests for api endpoints, services and any other logic you have
  you can run the tests with the command `npm test`
 */
import request from "supertest";
import app from "../src/app.js";

describe("GET /api/health", () => {
  it("returns health status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ok", true);
    expect(res.body).toHaveProperty("service");
    expect(res.body).toHaveProperty("timestamp");
  });
});
