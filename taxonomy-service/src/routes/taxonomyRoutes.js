const express = require("express");
const taxonomyController = require('../controllers/taxonomyController');

const router = express.Router();

router.get('/stats', taxonomyController.getStats)

module.exports = router;