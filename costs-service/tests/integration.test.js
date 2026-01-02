import request from "supertest";
import app from "../src/app.js";
import { connectMongo, disconnectMongo } from "../src/config/mongo.js";
import Cost from "../src/models/Cost.js";
import Report from "../src/models/Report.js";
import { COST_CATEGORIES } from "../src/utils/constants.js";

beforeAll(async () => {
  await connectMongo();
});

afterAll(async () => {
  await disconnectMongo();
});

beforeEach(async () => {
  // tests are using the test database (MONGO_URI_TEST)
  await Cost.deleteMany({});
  await Report.deleteMany({});
});

describe("COSTS Microservice Tests", () => {
  const testUserid = 123123;

  describe("POST /api/add - Add Cost Item", () => {
    it("should add a new cost item successfully", async () => {
      const costData = {
        description: "Groceries",
        category: "food",
        userid: testUserid,
        sum: 150.5,
      };

      const response = await request(app).post("/api/add").send(costData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("description", "Groceries");
      expect(response.body).toHaveProperty("category", "food");
      expect(response.body).toHaveProperty("userid", testUserid);
      expect(response.body).toHaveProperty("sum", 150.5);
      expect(response.body).toHaveProperty("date");
    });

    it("should accept all valid categories", async () => {
      for (const category of COST_CATEGORIES) {
        const cost = {
          description: `Test ${category}`,
          category,
          userid: testUserid,
          sum: 100,
        };

        const response = await request(app).post("/api/add").send(cost);
        expect(response.status).toBe(201);
        expect(response.body.category).toBe(category);
      }
    });

    it("should handle case-insensitive categories", async () => {
      const cost = {
        description: "Test",
        category: "FOOD",
        userid: testUserid,
        sum: 100,
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(201);
      expect(response.body.category).toBe("food");
    });

    it("should reject invalid category", async () => {
      const cost = {
        description: "Test",
        category: "invalid",
        userid: testUserid,
        sum: 100,
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(400);
    });

    it("should reject missing required fields", async () => {
      const response = await request(app).post("/api/add").send({
        description: "Test",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("message");
    });

    it("should reject negative sum", async () => {
      const cost = {
        description: "Test",
        category: "food",
        userid: testUserid,
        sum: -50,
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(400);
    });

    it("should reject costs from past months", async () => {
      const cost = {
        description: "Past month cost",
        category: "food",
        userid: testUserid,
        sum: 100,
        date: new Date(2025, 11, 27),
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toContain("past month");
    });

    it("should accept costs with past dates in current month", async () => {
      const cost = {
        description: "Early month cost",
        category: "food",
        userid: testUserid,
        sum: 100,
        date: new Date(2026, 0, 3),
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("date");
    });

    it("should accept costs with current month dates", async () => {
      const cost = {
        description: "Current month cost",
        category: "food",
        userid: testUserid,
        sum: 100,
        date: new Date(2026, 0, 15),
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(201);
    });

    it("should accept costs with future month dates", async () => {
      const cost = {
        description: "Future month cost",
        category: "food",
        userid: testUserid,
        sum: 100,
        date: new Date(2026, 1, 15),
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(201);
    });

    it("should default to current date if no date provided", async () => {
      const cost = {
        description: "No date",
        category: "food",
        userid: testUserid,
        sum: 100,
      };

      const response = await request(app).post("/api/add").send(cost);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("date");
    });
  });

  describe("GET /api/report - Monthly Report", () => {
    beforeEach(async () => {
      // add some test costs for January 2026
      await Cost.create([
        {
          description: "choco",
          category: "food",
          userid: testUserid,
          sum: 12,
          date: new Date(2026, 0, 17),
        },
        {
          description: "baigale",
          category: "food",
          userid: testUserid,
          sum: 14,
          date: new Date(2026, 0, 22),
        },
        {
          description: "math book",
          category: "education",
          userid: testUserid,
          sum: 82,
          date: new Date(2026, 0, 10),
        },
        {
          description: "java book",
          category: "education",
          userid: testUserid,
          sum: 112,
          date: new Date(2026, 0, 12),
        },
      ]);
    });

    it("should return monthly report in correct format", async () => {
      const response = await request(app)
        .get("/api/report")
        .query({ id: testUserid, year: 2026, month: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userid", testUserid);
      expect(response.body).toHaveProperty("year", 2026);
      expect(response.body).toHaveProperty("month", 1);
      expect(response.body).toHaveProperty("costs");
      expect(Array.isArray(response.body.costs)).toBe(true);
    });

    it("should group costs by category correctly", async () => {
      const response = await request(app)
        .get("/api/report")
        .query({ id: testUserid, year: 2026, month: 1 });

      expect(response.status).toBe(200);

      const report = response.body;

      // should have all 5 categories
      expect(report.costs).toHaveLength(5);

      // find food category
      const foodCategory = report.costs.find((c) => c.food !== undefined);
      expect(foodCategory).toBeDefined();
      expect(foodCategory.food).toHaveLength(2);

      // find education category
      const educationCategory = report.costs.find(
        (c) => c.education !== undefined
      );
      expect(educationCategory).toBeDefined();
      expect(educationCategory.education).toHaveLength(2);

      // verify cost item structure
      const firstFood = foodCategory.food[0];
      expect(firstFood).toHaveProperty("sum");
      expect(firstFood).toHaveProperty("description");
      expect(firstFood).toHaveProperty("day");
    });

    it("should reject missing query parameters", async () => {
      const response = await request(app).get("/api/report").query({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("message");
    });

    it("should validate month range", async () => {
      const response = await request(app)
        .get("/api/report")
        .query({ id: testUserid, year: 2026, month: 13 });

      expect(response.status).toBe(400);
    });

    it("should return empty categories for months with no costs", async () => {
      // request report for future month with no data
      const response = await request(app)
        .get("/api/report")
        .query({ id: testUserid, year: 2026, month: 12 });

      expect(response.status).toBe(200);
      expect(response.body.costs).toHaveLength(5);

      // all categories should have empty arrays
      response.body.costs.forEach((categoryObj) => {
        const categoryArray = Object.values(categoryObj)[0];
        expect(Array.isArray(categoryArray)).toBe(true);
        expect(categoryArray).toHaveLength(0);
      });
    });

    it("should validate userid is numeric", async () => {
      const response = await request(app)
        .get("/api/report")
        .query({ id: "abc", year: 2026, month: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });

    it("should validate year is numeric", async () => {
      const response = await request(app)
        .get("/api/report")
        .query({ id: testUserid, year: "abc", month: 1 });

      expect(response.status).toBe(400);
    });
  });

  describe("computed design pattern", () => {
    it("should cache reports for past months", async () => {
      // create costs for a past month (nov 2025)
      await Cost.create([
        {
          description: "test",
          category: "food",
          userid: testUserid,
          sum: 100,
          date: new Date(2025, 10, 15),
        },
      ]);

      // first request - should generate and cache
      const response1 = await request(app)
        .get("/api/report")
        .query({ id: testUserid, year: 2025, month: 11 });

      expect(response1.status).toBe(200);

      // check if report was cached
      const cachedReport = await Report.findOne({
        userid: testUserid,
        year: 2025,
        month: 11,
      });
      expect(cachedReport).toBeTruthy();

      // second request - should use cache
      const response2 = await request(app)
        .get("/api/report")
        .query({ id: testUserid, year: 2025, month: 11 });

      expect(response2.status).toBe(200);
      expect(response2.body).toEqual(response1.body);
    });
  });

  describe("error handling", () => {
    it("should return proper error format", async () => {
      const response = await request(app)
        .get("/api/report")
        .query({ id: "invalid", year: 2026, month: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("message");
      expect(typeof response.body.id).toBe("number");
      expect(typeof response.body.message).toBe("string");
    });
  });

  describe("GET /api/user/costs - Get Total User Costs", () => {
    beforeEach(async () => {
      // add multiple test costs for the user across different months and categories
      await Cost.create([
        {
          description: "Groceries",
          category: "food",
          userid: testUserid,
          sum: 150.5,
          date: new Date(2026, 0, 15),
        },
        {
          description: "Rent payment",
          category: "housing",
          userid: testUserid,
          sum: 25,
          date: new Date(2026, 0, 10),
        },
        {
          description: "Python course",
          category: "education",
          userid: testUserid,
          sum: 299,
          date: new Date(2025, 11, 20),
        },
        {
          description: "Doctor visit",
          category: "health",
          userid: testUserid,
          sum: 120,
          date: new Date(2026, 0, 5),
        },
        {
          description: "Concert tickets",
          category: "sports",
          userid: testUserid,
          sum: 85,
          date: new Date(2026, 1, 1),
        },
      ]);

      // add costs for another user to verify filtering
      await Cost.create({
        description: "Other user cost",
        category: "food",
        userid: 999,
        sum: 50,
        date: new Date(2026, 0, 15),
      });
    });

    it("should return correct total for user with costs", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: testUserid });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userid", testUserid);
      expect(response.body).toHaveProperty("total");
      // 150.5 + 25 + 299 + 120 + 85 = 679.5
      expect(response.body.total).toBe(679.5);
    });

    it("should return response in correct format", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: testUserid });

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
      expect(Object.keys(response.body)).toEqual(["userid", "total"]);
      expect(typeof response.body.userid).toBe("number");
      expect(typeof response.body.total).toBe("number");
    });

    it("should return zero total for user with no costs", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: 88888 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userid", 88888);
      expect(response.body).toHaveProperty("total", 0);
    });

    it("should not include costs from other users", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: testUserid });

      expect(response.status).toBe(200);
      // total should be 679.5 (not including the 50 from userid 999)
      expect(response.body.total).toBe(679.5);
    });

    it("should aggregate costs across multiple months and years", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: testUserid });

      expect(response.status).toBe(200);
      // should aggregate costs from both 2025 (299) and 2026 (380.5)
      expect(response.body.total).toBe(679.5);
    });

    it("should aggregate costs across all categories", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: testUserid });

      expect(response.status).toBe(200);
      // should aggregate food, housing, education, health, and sports
      expect(response.body.total).toBe(679.5);
    });

    it("should reject missing id parameter", async () => {
      const response = await request(app).get("/api/user/costs").query({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("id", 8);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toContain(
        "Missing required query parameter"
      );
    });

    it("should validate id is numeric", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: "invalid" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("id", 9);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toContain("must be a valid number");
    });

    it("should handle decimal sums correctly", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: testUserid });

      expect(response.status).toBe(200);
      // includes 150.5 as a decimal
      expect(response.body.total).toBe(679.5);
    });

    it("should return correct total for other user", async () => {
      const response = await request(app)
        .get("/api/user/costs")
        .query({ id: 999 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userid", 999);
      expect(response.body).toHaveProperty("total", 50);
    });
  });
});
