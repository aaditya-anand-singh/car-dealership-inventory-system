const request = require("supertest");
const app = require("../app");

describe("POST /api/auth/register", () => {
    test("should register a new user successfully", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: "Aaditya",
                email: "aaditya@gmail.com",
                password: "password123"
            });

        expect(response.statusCode).toBe(201);
    });
});