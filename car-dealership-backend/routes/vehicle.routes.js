const express = require("express");
const router = express.Router();


const verifyToken = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const connection = require("../config/db");
router.post(
    "/",
    verifyToken,
    isAdmin,
    async (req, res) => {

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

if (!price) {
    return res.status(400).json({
        message: "Price is required"
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

    }
);



module.exports = router;