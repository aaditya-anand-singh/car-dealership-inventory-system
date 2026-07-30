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

test("should return 400 if stock is negative", async () => {

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
            stock: -1
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Stock cannot be negative");

});

});

describe("GET /api/vehicles", () => {

    beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
});

    test("should return 401 if token is missing", async () => {

        const response = await request(app)
            .get("/api/vehicles");

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Access denied. No token provided.");

    });

    test("should return 401 if token is invalid", async () => {

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", "Bearer invalidtoken");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid token.");

});

test("should allow customer to view vehicles", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

});

test("should allow admin to view vehicles", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@admin.com`,
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
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

});


test("should return an empty array when no vehicles are available", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);

});

test("should return all available vehicles", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Fortuner",
            2023,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            customer.insertId,

            "Hyundai",
            "Creta",
            2024,
            1800000,
            "White",
            "Petrol",
            "Manual",
            3,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);

});


test("should return correct vehicle details", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users (username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    const brand = `Honda_${Date.now()}`;
    const model = "City";
    const year = 2025;

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            brand,
            model,
            year,
            1600000,
            "Blue",
            "Petrol",
            "Manual",
            10,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);

    expect(response.body[0].brand).toBe(brand);
    expect(response.body[0].model).toBe(model);
    expect(response.body[0].year).toBe(year);
    expect(Number(response.body[0].price)).toBe(1600000);
    expect(response.body[0].color).toBe("Blue");
    expect(response.body[0].fuelType).toBe("Petrol");
    expect(response.body[0].transmission).toBe("Manual");
    expect(response.body[0].stock).toBe(10);

});

test("should not return vehicles with zero stock", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            // Available vehicle
            `Toyota_${Date.now()}`,
            "Fortuner",
            2023,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            customer.insertId,

            // Out of stock vehicle
            `Hyundai_${Date.now()}`,
            "Creta",
            2024,
            1800000,
            "White",
            "Petrol",
            "Manual",
            0,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].stock).toBeGreaterThan(0);

});

test("should return vehicles ordered by brand", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota", "Fortuner", 2023, 4200000, "Black", "Diesel", "Automatic", 5, customer.insertId,
            "Hyundai", "Creta", 2024, 1800000, "White", "Petrol", "Manual", 3, customer.insertId,
            "Maruti", "Swift", 2022, 800000, "Red", "Petrol", "Manual", 7, customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body[0].brand).toBe("Hyundai");
    expect(response.body[1].brand).toBe("Maruti");
    expect(response.body[2].brand).toBe("Toyota");

});

test("should return an empty array when all vehicles are out of stock", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            `Toyota_${Date.now()}`,
            "Fortuner",
            2023,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            0,
            customer.insertId,

            `Hyundai_${Date.now()}`,
            "Creta",
            2024,
            1800000,
            "White",
            "Petrol",
            "Manual",
            0,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});

});



describe("GET /api/vehicles/search", () => {
        beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
});

    test("should return 401 if token is missing", async () => {

        const response = await request(app)
            .get("/api/vehicles/search");

      expect(response.statusCode).toBe(401);

expect(response.body).toEqual({
    message: "Access denied. No token provided."
});

    });


    test("should return 401 if token is invalid", async () => {

    const response = await request(app)
        .get("/api/vehicles/search")
        .set("Authorization", "Bearer invalid_token");

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
        message: "Invalid token."
    });

});



test("should return all available vehicles when no search filters are provided", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Fortuner",
            2024,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            customer.insertId,

            "Hyundai",
            "Creta",
            2023,
            1800000,
            "White",
            "Petrol",
            "Manual",
            3,
            customer.insertId,

            "Honda",
            "City",
            2022,
            1500000,
            "Silver",
            "Petrol",
            "Manual",
            0,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles/search")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveLength(2);

    expect(response.body[0].brand).toBe("Hyundai");
    expect(response.body[1].brand).toBe("Toyota");

});

test("should return vehicles matching the brand", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Fortuner",
            2024,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            customer.insertId,

            "Hyundai",
            "Creta",
            2023,
            1800000,
            "White",
            "Petrol",
            "Manual",
            3,
            customer.insertId,

            "Toyota",
            "Innova",
            2022,
            2500000,
            "Silver",
            "Diesel",
            "Manual",
            4,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles/search?brand=Toyota")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);

    expect(response.body[0].brand).toBe("Toyota");
    expect(response.body[1].brand).toBe("Toyota");
});

test("should return vehicles matching the model", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Camry",
            2024,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            customer.insertId,

            "Honda",
            "City",
            2023,
            1800000,
            "White",
            "Petrol",
            "Manual",
            3,
            customer.insertId,

            "Hyundai",
            "Creta",
            2022,
            1500000,
            "Silver",
            "Petrol",
            "Manual",
            4,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles/search?model=City")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);

    expect(response.body[0].brand).toBe("Honda");
    expect(response.body[0].model).toBe("City");
});

test("should return vehicles within the given price range", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Camry",
            2024,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            customer.insertId,

            "Honda",
            "City",
            2023,
            1800000,
            "White",
            "Petrol",
            "Manual",
            3,
            customer.insertId,

            "Hyundai",
            "Creta",
            2022,
            2500000,
            "Silver",
            "Petrol",
            "Manual",
            4,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles/search?minPrice=1500000&maxPrice=3000000")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveLength(2);

    expect(response.body[0].price).toBe("1800000.00");
    expect(response.body[1].price).toBe("2500000.00");
});


test("should return vehicles matching multiple search filters", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Camry",
            2024,
            2500000,
            "Black",
            "Petrol",
            "Automatic",
            5,
            customer.insertId,

            "Toyota",
            "Corolla",
            2023,
            1500000,
            "White",
            "Petrol",
            "Manual",
            4,
            customer.insertId,

            "Honda",
            "City",
            2023,
            2500000,
            "Silver",
            "Petrol",
            "Automatic",
            3,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles/search?brand=Toyota&minPrice=2000000&maxPrice=3000000")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveLength(1);

    expect(response.body[0].brand).toBe("Toyota");
    expect(response.body[0].model).toBe("Camry");
});

test("should return an empty array when no vehicles match the search criteria", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Camry",
            2024,
            2500000,
            "Black",
            "Petrol",
            "Automatic",
            5,
            customer.insertId,

            "Honda",
            "City",
            2023,
            1800000,
            "White",
            "Petrol",
            "Manual",
            3,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles/search?brand=BMW")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});

test("should perform case-insensitive brand search", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Camry",
            2024,
            2500000,
            "Black",
            "Petrol",
            "Automatic",
            5,
            customer.insertId
        ]
    );

    const response = await request(app)
        .get("/api/vehicles/search?brand=toyota")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);

    expect(response.body[0].brand).toBe("Toyota");
});

test("should return 400 when minPrice is greater than maxPrice", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/api/vehicles/search?minPrice=3000000&maxPrice=1000000")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({
        message: "Minimum price cannot be greater than maximum price."
    });

});


test("should return 400 when price values are invalid", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/api/vehicles/search?minPrice=abc&maxPrice=500000")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({
        message: "Price values must be valid numbers."
    });

});
});

describe("PUT /api/vehicles/:id", () => {

            beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
});

    test("should return 401 if token is missing", async () => {

        const response = await request(app)
            .put("/api/vehicles/1")
            .send({
                brand: "Toyota",
                model: "Camry",
                year: 2024,
                price: 3000000,
                color: "Black",
                fuelType: "Petrol",
                transmission: "Automatic",
                stock: 5
            });

        expect(response.statusCode).toBe(401);

        expect(response.body).toEqual({
            message: "Access denied. No token provided."
        });

    });

    test("should return 401 if token is invalid", async () => {

    const response = await request(app)
        .put("/api/vehicles/1")
        .set("Authorization", "Bearer invalidtoken")
        .send({
            brand: "Toyota",
            model: "Camry",
            year: 2024,
            price: 3000000,
            color: "Black",
            fuelType: "Petrol",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
        message: "Invalid token."
    });

});

test("should return 403 if user is not an admin", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .put("/api/vehicles/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Camry",
            year: 2024,
            price: 3000000,
            color: "Black",
            fuelType: "Petrol",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(403);

    expect(response.body).toEqual({
        message: "Access denied. Admins only."
    });

});

test("should return 404 if vehicle does not exist", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
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
        .put("/api/vehicles/99999")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Camry",
            year: 2024,
            price: 3200000,
            color: "White",
            fuelType: "Petrol",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual({
        message: "Vehicle not found."
    });

});

test("should return 404 if vehicle does not exist", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
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
        .put("/api/vehicles/999999")
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Toyota",
            model: "Camry",
            year: 2024,
            price: 3200000,
            color: "White",
            fuelType: "Petrol",
            transmission: "Automatic",
            stock: 5
        });

    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual({
        message: "Vehicle not found."
    });

});


test("should update vehicle successfully", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
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

    const [vehicle] = await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Camry",
            2024,
            3200000,
            "White",
            "Petrol",
            "Automatic",
            5,
            admin.insertId
        ]
    );

    const response = await request(app)
        .put(`/api/vehicles/${vehicle.insertId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            brand: "Honda",
            model: "City",
            year: 2025,
            price: 1800000,
            color: "Black",
            fuelType: "Petrol",
            transmission: "Manual",
            stock: 10
        });

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe("Vehicle updated successfully.");

    expect(response.body.vehicle.brand).toBe("Honda");
    expect(response.body.vehicle.model).toBe("City");
    expect(response.body.vehicle.year).toBe(2025);
    expect(response.body.vehicle.price).toBe("1800000.00");
    expect(response.body.vehicle.color).toBe("Black");
    expect(response.body.vehicle.fuelType).toBe("Petrol");
    expect(response.body.vehicle.transmission).toBe("Manual");
    expect(response.body.vehicle.stock).toBe(10);

});
});


describe("DELETE /api/vehicles/:id", () => {

                beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
});

    test("should return 401 if token is not provided", async () => {

        const response = await request(app)
            .delete("/api/vehicles/1");

        expect(response.statusCode).toBe(401);

        expect(response.body.message).toBe(
            "Access denied. No token provided."
        );

    });

    test("should return 401 if token is invalid", async () => {

    const response = await request(app)
        .delete("/api/vehicles/1")
        .set("Authorization", "Bearer invalidToken");

    expect(response.statusCode).toBe(401);

    expect(response.body.message).toBe(
        "Invalid token."
    );

});

test("should return 403 if customer tries to delete vehicle", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password)
         VALUES (?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword
        ]
    );

    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .delete("/api/vehicles/1")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(403);

    expect(response.body).toEqual({
        message: "Access denied. Admins only."
    });

});

test("should return 404 if vehicle does not exist", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
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
        .delete("/api/vehicles/99999")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual({
        message: "Vehicle not found."
    });

});

test("should delete vehicle successfully by admin", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );


    const [vehicle] = await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Fortuner",
            2024,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            admin.insertId
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
        .delete(`/api/vehicles/${vehicle.insertId}`)
        .set("Authorization", `Bearer ${token}`);


    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
        message: "Vehicle deleted successfully."
    });

});


test("should return 404 if vehicle is already deleted", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );


    const [vehicle] = await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Honda",
            "City",
            2024,
            1500000,
            "White",
            "Petrol",
            "Manual",
            3,
            admin.insertId
        ]
    );


    const token = jwt.sign(
        {
            id: admin.insertId,
            role: "admin"
        },
        process.env.JWT_SECRET
    );


    // First delete
    await request(app)
        .delete(`/api/vehicles/${vehicle.insertId}`)
        .set("Authorization", `Bearer ${token}`);


    // Second delete
    const response = await request(app)
        .delete(`/api/vehicles/${vehicle.insertId}`)
        .set("Authorization", `Bearer ${token}`);


    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual({
        message: "Vehicle not found."
    });

});
});

describe("POST /api/vehicles/:id/purchase", () => {
                    beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
}); 

    test("should return 401 if token is not provided", async () => {

        const response = await request(app)
            .post("/api/vehicles/1/purchase");


        expect(response.statusCode).toBe(401);


        expect(response.body).toEqual({
            message: "Access denied. No token provided."
        });

    });

    test("should return 401 if token is invalid", async () => {

    const response = await request(app)
        .post("/api/vehicles/1/purchase")
        .set(
            "Authorization",
            "Bearer invalidToken"
        );


    expect(response.statusCode).toBe(401);


    expect(response.body).toEqual({
        message: "Invalid token."
    });

});

test("should return 404 if vehicle does not exist", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);

    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "customer"
        ]
    );


    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );


    const response = await request(app)
        .post("/api/vehicles/99999/purchase")
        .set(
            "Authorization",
            `Bearer ${token}`
        );


    expect(response.statusCode).toBe(404);


    expect(response.body).toEqual({
        message: "Vehicle not found."
    });

});


test("should return 400 if vehicle is out of stock", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);


    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "customer"
        ]
    );


    const [vehicle] = await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Honda",
            "City",
            2024,
            1500000,
            "White",
            "Petrol",
            "Manual",
            0,
            customer.insertId
        ]
    );


    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );


    const response = await request(app)
        .post(`/api/vehicles/${vehicle.insertId}/purchase`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );


    expect(response.statusCode).toBe(400);


    expect(response.body).toEqual({
        message: "Vehicle is out of stock."
    });

});

test("should purchase vehicle successfully and decrease stock", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);


    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "customer"
        ]
    );


    const [vehicle] = await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Fortuner",
            2024,
            4200000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            customer.insertId
        ]
    );


    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );


    const response = await request(app)
        .post(`/api/vehicles/${vehicle.insertId}/purchase`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );


    expect(response.statusCode).toBe(200);


    expect(response.body).toEqual({
        message: "Vehicle purchased successfully."
    });


    const [updatedVehicle] = await connection.query(
        "SELECT stock FROM vehicles WHERE id = ?",
        [vehicle.insertId]
    );


    expect(updatedVehicle[0].stock).toBe(4);

});

test("should not allow purchase when stock is finished", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);


    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "customer"
        ]
    );


    const [vehicle] = await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Hyundai",
            "Creta",
            2024,
            1800000,
            "White",
            "Petrol",
            "Manual",
            1,
            customer.insertId
        ]
    );


    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );


    // First purchase
    const firstResponse = await request(app)
        .post(`/api/vehicles/${vehicle.insertId}/purchase`)
        .set("Authorization", `Bearer ${token}`);


    expect(firstResponse.statusCode).toBe(200);


    // Second purchase
    const secondResponse = await request(app)
        .post(`/api/vehicles/${vehicle.insertId}/purchase`)
        .set("Authorization", `Bearer ${token}`);


    expect(secondResponse.statusCode).toBe(400);


    expect(secondResponse.body).toEqual({
        message: "Vehicle is out of stock."
    });

});
});

describe("POST /api/vehicles/:id/restock", () => {


                        beforeEach(async () => {
    await connection.query("DELETE FROM vehicles");
    await connection.query("DELETE FROM users");
}); 
    test("should return 401 if token is not provided", async () => {

        const response = await request(app)
            .post("/api/vehicles/1/restock")
            .send({
                quantity: 10
            });


        expect(response.statusCode).toBe(401);


        expect(response.body).toEqual({
            message: "Access denied. No token provided."
        });

    });

    test("should return 403 if customer tries to restock vehicle", async () => {

    const hashedPassword = await bcrypt.hash("password123", 10);


    const [customer] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `customer_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "customer"
        ]
    );


    const token = jwt.sign(
        {
            id: customer.insertId,
            role: "customer"
        },
        process.env.JWT_SECRET
    );


    const response = await request(app)
        .post("/api/vehicles/1/restock")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            quantity: 10
        });


    expect(response.statusCode).toBe(403);


    expect(response.body).toEqual({
        message: "Access denied. Admins only."
    });

});

test("should return 404 if vehicle does not exist", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);


    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
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
        .post("/api/vehicles/99999/restock")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            quantity: 10
        });


    expect(response.statusCode).toBe(404);


    expect(response.body).toEqual({
        message: "Vehicle not found."
    });

});

test("should return 400 if restock quantity is invalid", async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);


    const [admin] = await connection.query(
        `INSERT INTO users(username, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [
            `admin_${Date.now()}`,
            `${Date.now()}@gmail.com`,
            hashedPassword,
            "admin"
        ]
    );


    const [vehicle] = await connection.query(
        `INSERT INTO vehicles
        (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            "Toyota",
            "Innova",
            2024,
            2500000,
            "Black",
            "Diesel",
            "Automatic",
            5,
            admin.insertId
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
        .post(`/api/vehicles/${vehicle.insertId}/restock`)
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            quantity: 0
        });


    expect(response.statusCode).toBe(400);


    expect(response.body).toEqual({
        message: "Quantity must be greater than 0."
    });

});

});