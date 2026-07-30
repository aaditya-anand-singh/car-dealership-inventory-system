const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {

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

    res.status(201).json({
        message: "User registered successfully"
    });
});

module.exports = router;