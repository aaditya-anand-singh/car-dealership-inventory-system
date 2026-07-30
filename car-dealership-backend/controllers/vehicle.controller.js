const connection = require("../config/db");

const searchVehicles = async (req, res) => {

    try {

        const { brand, model, minPrice, maxPrice } = req.query;

        if (
            (minPrice && isNaN(Number(minPrice))) ||
            (maxPrice && isNaN(Number(maxPrice)))
        ) {
            return res.status(400).json({
                message: "Price values must be valid numbers."
            });
        }

        if (
            minPrice &&
            maxPrice &&
            Number(minPrice) > Number(maxPrice)
        ) {
            return res.status(400).json({
                message: "Minimum price cannot be greater than maximum price."
            });
        }

        let sql = `
            SELECT *
            FROM vehicles
            WHERE stock > 0
        `;

        const values = [];

        if (brand) {
            sql += ` AND brand = ?`;
            values.push(brand);
        }

        if (model) {
            sql += ` AND model = ?`;
            values.push(model);
        }

        if (minPrice) {
            sql += ` AND price >= ?`;
            values.push(Number(minPrice));
        }

        if (maxPrice) {
            sql += ` AND price <= ?`;
            values.push(Number(maxPrice));
        }

        sql += ` ORDER BY brand ASC`;

        const [vehicles] = await connection.query(sql, values);

        return res.status(200).json(vehicles);

    } catch (error) {

        return res.status(500).json({
            message: "Internal server error."
        });

    }

};

const updateVehicle = async (req, res) => {
    try {

        const { id } = req.params;

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

        const [vehicle] = await connection.query(
            "SELECT * FROM vehicles WHERE id = ?",
            [id]
        );

        if (vehicle.length === 0) {
            return res.status(404).json({
                message: "Vehicle not found."
            });
        }

        await connection.query(
            `UPDATE vehicles
             SET brand=?,
                 model=?,
                 year=?,
                 price=?,
                 color=?,
                 fuelType=?,
                 transmission=?,
                 stock=?
             WHERE id=?`,
            [
                brand,
                model,
                year,
                price,
                color,
                fuelType,
                transmission,
                stock,
                id
            ]
        );

        const [updatedVehicle] = await connection.query(
            "SELECT * FROM vehicles WHERE id = ?",
            [id]
        );

        return res.status(200).json({
            message: "Vehicle updated successfully.",
            vehicle: updatedVehicle[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
};

const deleteVehicle = async (req, res) => {
    try {

        const { id } = req.params;

        const [vehicle] = await connection.query(
            "SELECT * FROM vehicles WHERE id = ?",
            [id]
        );

        if (vehicle.length === 0) {
            return res.status(404).json({
                message: "Vehicle not found."
            });
        }


        await connection.query(
            "DELETE FROM vehicles WHERE id = ?",
            [id]
        );


        return res.status(200).json({
            message: "Vehicle deleted successfully."
        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error."
        });

    }
};

const purchaseVehicle = async (req, res) => {

    try {

        const { id } = req.params;

        const [vehicle] = await connection.query(
            "SELECT * FROM vehicles WHERE id = ?",
            [id]
        );


        if (vehicle.length === 0) {

            return res.status(404).json({
                message: "Vehicle not found."
            });

        }


        if (vehicle[0].stock <= 0) {

            return res.status(400).json({
                message: "Vehicle is out of stock."
            });

        }


        await connection.query(
            `UPDATE vehicles
             SET stock = stock - 1
             WHERE id = ?`,
            [id]
        );


        return res.status(200).json({
            message: "Vehicle purchased successfully."
        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error."
        });

    }

};

const restockVehicle = async (req, res) => {

    try {

        const { id } = req.params;

        const { quantity } = req.body;


        if (
            quantity === undefined ||
            quantity === null ||
            quantity <= 0
        ) {

            return res.status(400).json({
                message: "Quantity must be greater than 0."
            });

        }


        const [vehicle] = await connection.query(
            "SELECT * FROM vehicles WHERE id = ?",
            [id]
        );


        if (vehicle.length === 0) {

            return res.status(404).json({
                message: "Vehicle not found."
            });

        }


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error."
        });

    }

};
module.exports = {
    searchVehicles,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle,
    restockVehicle
};