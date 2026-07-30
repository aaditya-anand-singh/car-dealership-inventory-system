const request = require("supertest");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const app = require("../app");
const jwt = require("jsonwebtoken");
describe("POST /api/auth/login", () => {

    beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
});
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



test("should return JWT token on successful login", async () => {

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
            password
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();

});


test("should return user details on successful login", async () => {

    const username = `user_${Date.now()}`;
    const email = `${Date.now()}@gmail.com`;
    const password = "password123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
        "INSERT INTO users(username,email,password) VALUES(?,?,?)",
        [username, email, hashedPassword]
    );

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password
        });

    expect(response.statusCode).toBe(200);

    expect(response.body.user.id).toBe(result.insertId);
    expect(response.body.user.username).toBe(username);
    expect(response.body.user.email).toBe(email);

});



test("should not return password in login response", async () => {

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

    expect(response.body.user.password).toBeUndefined();

});

test("should generate JWT with correct user id", async () => {

    const username = `user_${Date.now()}`;
    const email = `${Date.now()}@gmail.com`;
    const password = "password123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
        "INSERT INTO users(username, email, password) VALUES(?,?,?)",
        [username, email, hashedPassword]
    );

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password
        });

    const decoded = jwt.verify(
    response.body.token,
    process.env.JWT_SECRET
);

    expect(decoded.id).toBe(result.insertId);

});


test("should return user role on successful login", async () => {

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
            password
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.role).toBe("customer");

});

afterAll(async () => {
    await connection.end();
});