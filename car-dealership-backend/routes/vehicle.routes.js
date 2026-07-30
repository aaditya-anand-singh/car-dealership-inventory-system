const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");
router.post(
    "/",
    verifyToken,
    isAdmin,
    (req, res) => {
        res.status(200).json({
            message: "Vehicle route reached",
            user: req.user
        });
    }
);



module.exports = router;