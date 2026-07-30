const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const router = express.Router();

// ========================= REGISTER =========================

router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

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

        const [existingUser] = await connection.query(
            "SELECT id FROM users WHERE username = ?",
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        const [existingEmail] = await connection.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingEmail.length > 0) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(
            "INSERT INTO users(username, email, password) VALUES(?,?,?)",
            [username, email, hashedPassword]
        );

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {

        console.error("Registration Error:", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

});

// ========================= LOGIN =========================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

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

        const [users] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        const user = users[0];

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const isMatch = await bcrypt.compare(
    password,
    user.password
);

if (!isMatch) {
    return res.status(401).json({
        message: "Invalid email or password"
    });
}

const token = jwt.sign(
    {
        id: user.id
    },
    "secretkey"
);

return res.status(200).json({
    message: "Login successful",
    token,
    user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }
});
    } catch (err) {

        console.error("Login Error:", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

});

module.exports = router;