const request = require("supertest");
const app = require("../app");
const connection = require("../config/db");

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

    test("should return 400 when username is missing", async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send({
            email: "aaditya@gmail.com",
            password: "password123"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Username is required");
});

test("should return 400 when email is missing", async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send({
            username: "Aaditya",
            password: "password123"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Email is required");
});

test("should return 400 when password is missing", async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send({
            username: "Aaditya",
            email: "aaditya@gmail.com"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Password is required");
});

test("should return 400 when email format is invalid", async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send({
            username: "Aaditya",
            email: "aadityagmail.com",
            password: "password123"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid email format");
});

test("should return 409 when username already exists", async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            username: "Aaditya",
            email: "aaditya1@gmail.com",
            password: "password123"
        });

    const response = await request(app)
        .post("/api/auth/register")
        .send({
            username: "Aaditya",
            email: "aaditya2@gmail.com",
            password: "password123"
        });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Username already exists");

});
test("should save a new user in database", async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            username: "Aaditya",
            email: "aaditya@gmail.com",
            password: "password123"
        });

    const [rows] = await connection.query(
        "SELECT * FROM users WHERE username = ?",
        ["Aaditya"]
    );

    expect(rows.length).toBe(1);
});
});