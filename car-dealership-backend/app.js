const express = require("express");
const authRoutes = require("./routes/auth.routes");
const vehicleRoutes = require("./routes/vehicle.routes");

app.use("/api/vehicles", vehicleRoutes);

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;