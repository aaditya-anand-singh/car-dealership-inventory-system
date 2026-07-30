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

test("should return 400 when email is missing", async () => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            password: "password123"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Email is required");

});

test("should return 400 when password is missing", async () => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "test@gmail.com"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Password is required");

});

test("should return 401 when email is not registered", async () => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "nouser@gmail.com",
            password: "password123"
        });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");

});

test("should return 401 when password is incorrect", async () => {

    const username = `user_${Date.now()}`;
    const email = `${Date.now()}@gmail.com`;
    const password = "password123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
        "INSERT INTO users(username,email,password) VALUES(?,?,?)",
        [username, email, hashedPassword]
    );

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password: "wrongpassword"
        });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");

});


afterAll(async () => {
    await connection.end();
});