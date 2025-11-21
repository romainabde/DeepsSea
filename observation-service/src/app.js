const express = require("express");

const cors = require("cors");
const observationsRoutes = require("./routes/observationsRoutes");
const speciesRoutes = require("./routes/speciesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const expertRoutes = require("./routes/expertRoutes");

const errorHandler = require("./middlewares/errorMiddleware");
const { authMiddleware, requireRole } = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// middleware général d'authentification
app.use(authMiddleware);

// Routes
app.use("/observations", observationsRoutes);
app.use("/species", speciesRoutes);
app.use("/admin", requireRole("ADMIN"), adminRoutes);
app.use("/expert", requireRole("EXPERT", "ADMIN"), expertRoutes)

// Middleware d'erreur
app.use(errorHandler);

module.exports = app;
