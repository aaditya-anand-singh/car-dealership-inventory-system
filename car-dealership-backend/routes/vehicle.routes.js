const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

router.post("/", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Vehicle route reached"
    });
});

module.exports = router;