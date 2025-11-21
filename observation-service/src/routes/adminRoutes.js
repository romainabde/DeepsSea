const express = require("express");
const observationController = require('../controllers/ObservationController');

const router = express.Router();

router.get('/user/:id/history', observationController.getUserHistory)

module.exports = router;