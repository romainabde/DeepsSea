const express = require("express");

const cors = require("cors");
const observationsRoutes = require("./routes/observationsRoutes");
const speciesRoutes = require("./routes/speciesRoutes");

const errorHandler = require("./middlewares/errorMiddleware");
const { authMiddleware } = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// middleware général d'authentification
app.use(authMiddleware);

// Routes
app.use("/observations", observationsRoutes);
app.use("/species", speciesRoutes)

// Middleware d'erreur
app.use(errorHandler);

module.exports = app;
