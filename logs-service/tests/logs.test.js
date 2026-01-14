
/*
  This file contains integration tests for the logs service API endpoints.
  It verifies that logs can be created and retrieved from the database.
*/
import request from "supertest";
import app from "../src/app.js";
import { LogModel } from "../src/models/logs.model.js";

// Test suite for logs service
describe("Logs Service", () => {
  it("GET /api/logs should return logs from database", async () => {
    // Create a log entry
    await LogModel.create({
      service: "logs-service",
      method: "GET",
      url: "/test",
      status: 200,
      message: "ok",
    });

    // Make GET request to fetch logs
    const response = await request(app).get("/api/logs");

    // Validate response
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].service).toBe("logs-service");
  });
});
