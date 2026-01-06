// Basic test for GET /api/logs
import request from "supertest";
import app from "../src/app.js";
import { LogModel } from "../src/models/logs.model.js";

describe("Logs Service", () => {
  it("GET /api/logs should return logs from database", async () => {
    
    await LogModel.create({
      service: "logs-service",
      method: "GET",
      url: "/test",
      status: 200,
      message: "ok",
    });

   
    const response = await request(app).get("/api/logs");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].service).toBe("logs-service");
  });
});
