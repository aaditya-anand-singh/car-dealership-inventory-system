const express = require("express");
const authRoutes = require("./routes/auth.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const cors = require("cors");


const app = express();
app.use(
    cors({

        origin:"http://localhost:5173",

        credentials:true,

        exposedHeaders:[
            "X-Total-Count",
            "X-Current-Page",
            "X-Total-Pages"
        ]

    })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

module.exports = app;