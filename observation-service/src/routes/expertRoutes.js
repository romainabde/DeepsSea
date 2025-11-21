const express = require("express");
const specieController = require('../controllers/SpecieController');

const router = express.Router();

router.get('/species/:id/history', specieController.getSpecieHistory)

module.exports = router;