const request = require("supertest");
const app = require("../app");

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
});