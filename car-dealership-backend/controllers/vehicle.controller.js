const connection = require("../config/db");

const searchVehicles = async (req, res) => {
    try {

const { brand, model, minPrice, maxPrice } = req.query;

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
    values.push(minPrice);
}

if (maxPrice) {
    sql += ` AND price <= ?`;
    values.push(maxPrice);
}

sql += ` ORDER BY brand ASC`;

const [vehicles] = await connection.query(sql, values);

return res.status(200).json(vehicles);

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