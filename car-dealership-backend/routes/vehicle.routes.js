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