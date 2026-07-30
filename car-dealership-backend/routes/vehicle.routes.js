const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");
const connection = require("../config/db");

const {
    searchVehicles,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle
} = require("../controllers/vehicle.controller");

// ===========================
// POST /api/vehicles
// ===========================

router.post(
    "/",
    verifyToken,
    isAdmin,
    async (req, res) => {

        try {

            const {
                brand,
                model,
                year,
                price,
                color,
                fuelType,
                transmission,
                stock
            } = req.body;

            if (!brand) {
                return res.status(400).json({
                    message: "Brand is required"
                });
            }

            if (!model) {
                return res.status(400).json({
                    message: "Model is required"
                });
            }

            if (!year) {
                return res.status(400).json({
                    message: "Year is required"
                });
            }

            if (price === undefined || price === null) {
                return res.status(400).json({
                    message: "Price is required"
                });
            }

            if (price <= 0) {
                return res.status(400).json({
                    message: "Price must be greater than 0"
                });
            }

            if (!fuelType) {
                return res.status(400).json({
                    message: "Fuel type is required"
                });
            }

            if (!transmission) {
                return res.status(400).json({
                    message: "Transmission is required"
                });
            }

            if (stock === undefined || stock === null) {
                return res.status(400).json({
                    message: "Stock is required"
                });
            }

            if (stock < 0) {
                return res.status(400).json({
                    message: "Stock cannot be negative"
                });
            }

            const [existingVehicle] = await connection.query(
                `SELECT id
                 FROM vehicles
                 WHERE brand = ? AND model = ? AND year = ?`,
                [brand, model, year]
            );

            if (existingVehicle.length > 0) {
                return res.status(409).json({
                    message: "Vehicle already exists"
                });
            }

            await connection.query(
                `INSERT INTO vehicles
                (brand, model, year, price, color, fuelType, transmission, stock, createdBy)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    brand,
                    model,
                    year,
                    price,
                    color,
                    fuelType,
                    transmission,
                    stock,
                    req.user.id
                ]
            );

            return res.status(201).json({
                message: "Vehicle added successfully"
            });

        } catch (err) {

            console.error("Vehicle Error:", err);

            return res.status(500).json({
                message: "Internal Server Error"
            });

        }

    }
);

// ===========================
// GET /api/vehicles
// ===========================

router.get(
    "/",
    verifyToken,
    async (req, res) => {

        try {

            const [vehicles] = await connection.query(
                `SELECT *
                 FROM vehicles
                 WHERE stock > 0
                 ORDER BY brand ASC`
            );

            return res.status(200).json(vehicles);

        } catch (err) {

            console.error("Get Vehicles Error:", err);

            return res.status(500).json({
                message: "Internal Server Error"
            });

        }

    }
);

// ===========================
// GET /api/vehicles/search
// ===========================

router.get(
    "/search",
    verifyToken,
    searchVehicles
);

// ===========================
// PUT /api/vehicles/:id
// ===========================

router.put(
    "/:id",
    verifyToken,
    isAdmin,
    updateVehicle
);

router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    deleteVehicle
);

router.post(
    "/:id/purchase",
    verifyToken,
    purchaseVehicle
);

router.post(
    "/:id/restock",
    verifyToken,
    isAdmin,
    async (req, res) => {

        return res.status(200).json({
            message: "Restock route working"
        });

    }
);
module.exports = router;