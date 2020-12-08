const request = require("supertest");
const app = require("../src/server/index.js");

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/all");
      expect(response.statusCode).toBe(200);
    });
  });