/**
  test file for the /api/about endpoint
  checks that the endpoint returns the correct format and data
*/
import request from "supertest";
import app from "../src/app.js";

describe("GET /api/about", () => {
  it("returns an array of team members with first_name and last_name", async () => {
    const res = await request(app).get("/api/about");
    console.log("/api/about response:", res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    for (const member of res.body) {
      expect(member).toHaveProperty("first_name");
      expect(member).toHaveProperty("last_name");
      expect(Object.keys(member)).toEqual(["first_name", "last_name"]);
    }
  });
});
