const express = require("express");
const cors = require("cors");
const taxonomyRoutes = require("./routes/taxonomyRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/taxonomy", taxonomyRoutes);

// Middleware d'erreur
app.use(errorHandler);

module.exports = app;
