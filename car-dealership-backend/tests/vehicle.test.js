const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/db");

describe("POST /api/vehicles", () => {
     beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
});
    test("should return 401 if no token is provided", async () => {

        const response = await request(app)
            .post("/api/vehicles")
            .send({
                brand: "Toyota",
                model: "Fortuner",
                year: 2024,
                price: 4200000,
                color: "Black",
                fuelType: "Diesel",
                transmission: "Automatic",
                stock: 5
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Access denied. No token provided.");

    });

    test("should return 401 if token is invalid", async () => {

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", "Bearer invalid_token")
            .send({
                brand: "Toyota",
                model: "Fortuner",
                year: 2024,
                price: 4200000,
                color: "Black",
                fuelType: "Diesel",
                transmission: "Automatic",
                stock: 5
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Invalid token.");

    });

    test("should return 403 if user is not admin", async () => {

        const token = jwt.sign(
            {
                id: 1,
                role: "customer"
            },
            process.env.JWT_SECRET
        );

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                brand: "Toyota",
                model: "Fortuner",
                year: 2024,
                price: 4200000,
                color: "Black",
                fuelType: "Diesel",
                transmission: "Automatic",
                stock: 5
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("Access denied. Admins only.");

    });

    test("should create a new vehicle successfully", async () => {

        const hashedPassword = await bcrypt.hash("password123", 10);

        const [admin] = await connection.query(
            `INSERT INTO users(username,email,password,role)
             VALUES(?,?,?,?)`,
            [
                `admin_${Date.now()}`,
                `${Date.now()}@gmail.com`,
                hashedPassword,
                "admin"
            ]
        );

        const token = jwt.sign(
            {
                id: admin.insertId,
                role: "admin"
            },
            process.env.JWT_SECRET
        );

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                brand: "Toyota",
                model: "Fortuner",
                year: 2024,
                price: 4200000,
                color: "Black",
                fuelType: "Diesel",
                transmission: "Automatic",
                stock: 5
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Vehicle added successfully");

    });


    test("should return 400 if brand is missing", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            model: "Fortuner",
            year: 2024,
            price: 4200000,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Brand is required");

});

test("should return 400 if model is missing", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            year: 2024,
            price: 4200000,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Model is required");

});


test("should return 400 if year is missing", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            price: 4200000,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Year is required");

});


test("should return 400 if price is missing", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Price is required");

});


test("should return 400 if fuel type is missing", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            price: 4200000,
            color: "Black",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Fuel type is required");

});

test("should return 400 if transmission is missing", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            price: 4200000,
            color: "Black",
            fuelType: "Diesel",
            stock: 5
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Transmission is required");

});


test("should return 400 if stock is missing", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            price: 4200000,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Stock is required");

});

test("should return 409 if vehicle already exists", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    // Create the vehicle for the first time
    await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            price: 4200000,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 5
        });

    // Try creating the same vehicle again
    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            price: 4500000,
            color: "White",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 10
        });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Vehicle already exists");

});


test("should save vehicle in database", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            price: 4200000,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 5
        });

    const [vehicles] = await connection.query(
        "SELECT * FROM vehicles"
    );

    expect(vehicles.length).toBe(1);

    expect(vehicles[0].brand).toBe("Toyota");
    expect(vehicles[0].model).toBe("Fortuner");
    expect(vehicles[0].year).toBe(2024);
    expect(Number(vehicles[0].price)).toBe(4200000);
    expect(vehicles[0].color).toBe("Black");
    expect(vehicles[0].fuelType).toBe("Diesel");
    expect(vehicles[0].transmission).toBe("Automatic");
    expect(vehicles[0].stock).toBe(5);
    expect(vehicles[0].createdBy).toBe(admin.insertId);

});

test("should return 400 if price is less than or equal to zero", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username,email,password,role)
         VALUES(?,?,?,?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );

    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Fortuner",
            year: 2024,
            price: 0,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Price must be greater than 0");

});

});