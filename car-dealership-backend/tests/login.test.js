const request = require("supertest");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const app = require("../app");

describe("POST /api/auth/login", () => {

    test("should login successfully with valid email and password", async () => {

        const username = `user_${Date.now()}`;
        const email = `${Date.now()}@gmail.com`;
        const password = "password123";

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(
            "INSERT INTO users(username, email, password) VALUES(?,?,?)",
            [username, email, hashedPassword]
        );

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Login successful");

    });

});

afterAll(async () => {
    await connection.end();
});