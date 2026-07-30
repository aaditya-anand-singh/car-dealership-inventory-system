const request = require("supertest");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const app = require("../app");

describe("POST /api/auth/register", () => {

    beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
});

    test("should register a new user successfully", async () => {

        const username = `user_${Date.now()}`;
        const email = `${Date.now()}@gmail.com`;

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username,
                email,
                password: "password123"
            });

        expect(response.statusCode).toBe(201);

    });

    test("should return 400 when username is missing", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                email: `${Date.now()}@gmail.com`,
                password: "password123"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Username is required");

    });

    test("should return 400 when email is missing", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: `user_${Date.now()}`,
                password: "password123"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Email is required");

    });

    test("should return 400 when password is missing", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: `user_${Date.now()}`,
                email: `${Date.now()}@gmail.com`
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Password is required");

    });

    test("should return 400 when email format is invalid", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: `user_${Date.now()}`,
                email: "invalidemail",
                password: "password123"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid email format");

    });

    test("should return 409 when username already exists", async () => {

        const username = `user_${Date.now()}`;

        await request(app)
            .post("/api/auth/register")
            .send({
                username,
                email: `first_${Date.now()}@gmail.com`,
                password: "password123"
            });

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username,
                email: `second_${Date.now()}@gmail.com`,
                password: "password123"
            });

        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe("Username already exists");

    });

    test("should return 409 when email already exists", async () => {

        const email = `${Date.now()}@gmail.com`;

        await request(app)
            .post("/api/auth/register")
            .send({
                username: `user1_${Date.now()}`,
                email,
                password: "password123"
            });

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: `user2_${Date.now()}`,
                email,
                password: "password123"
            });

        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe("Email already exists");

    });

    test("should save a new user in database", async () => {

        const username = `user_${Date.now()}`;
        const email = `${Date.now()}@gmail.com`;

        await request(app)
            .post("/api/auth/register")
            .send({
                username,
                email,
                password: "password123"
            });

        const [rows] = await connection.query(
            "SELECT id FROM users WHERE username = ?",
            [username]
        );

        expect(rows.length).toBe(1);

    });

    test("should store hashed password in database", async () => {

        const username = `user_${Date.now()}`;
        const email = `${Date.now()}@gmail.com`;
        const password = "password123";

        await request(app)
            .post("/api/auth/register")
            .send({
                username,
                email,
                password
            });

        const [rows] = await connection.query(
            "SELECT password FROM users WHERE username = ?",
            [username]
        );

        expect(rows.length).toBe(1);

        expect(rows[0].password).not.toBe(password);

        const isMatch = await bcrypt.compare(
            password,
            rows[0].password
        );

        expect(isMatch).toBe(true);

    });

    test("should not return password in response", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: `user_${Date.now()}`,
                email: `${Date.now()}@gmail.com`,
                password: "password123"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.password).toBeUndefined();

    });


});