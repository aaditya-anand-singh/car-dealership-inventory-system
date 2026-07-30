const express = require("express");
const connection = require("../config/db");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Validation
        if (!username) {
            return res.status(400).json({
                message: "Username is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Check duplicate username
        const [existingUser] = await connection.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

                const [existingEmail] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existingEmail.length > 0) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Insert user
        const hashedPassword = await bcrypt.hash(password, 10);
await connection.query(
    "INSERT INTO users(username,email,password) VALUES(?,?,?)",
    [username, email, hashedPassword]
);

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

});

module.exports = router;