const express = require("express");

const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/usersRoute");

const errorHandler = require("./middlewares/errorMiddleware");
const { authMiddleware, requireRole } = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/admin", authMiddleware, requireRole("ADMIN"), adminRoutes)
app.use("/users", authMiddleware, usersRoutes)

// Middleware d'erreur
app.use(errorHandler);

module.exports = app;
