const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

describe("POST /api/vehicles", () => {

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

test("should allow request with valid token", async () => {

    const token = jwt.sign(
        {
            id: 1,
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

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Vehicle route reached");

});

test("should attach decoded user to request", async () => {

    const token = jwt.sign(
        {
            id: 25,
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

    expect(response.statusCode).toBe(200);
    expect(response.body.user.id).toBe(25);
    expect(response.body.user.role).toBe("admin");

});
});