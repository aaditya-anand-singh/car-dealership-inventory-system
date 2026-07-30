const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Zaxscd@8",
    database: "car_dealership"
});

module.exports = connection;