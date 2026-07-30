const connection = require("../config/db");

const searchVehicles = async (req, res) => {
    try {

        const [vehicles] = await connection.query(`
            SELECT *
            FROM vehicles
            WHERE stock > 0
            ORDER BY brand ASC
        `);

        return res.status(200).json(vehicles);

    } catch (error) {

        return res.status(500).json({
            message: "Internal server error."
        });

    }
};

module.exports = {
    searchVehicles
};