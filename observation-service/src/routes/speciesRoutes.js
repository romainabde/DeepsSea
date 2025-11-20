const express = require("express");
const specieController = require('../controllers/SpecieController');

const router = express.Router();

router.post('/', specieController.createSpecie)

router.get('/', specieController.getSpeciesList)
router.get('/:id', specieController.getSpecie)
router.get('/:id/observations', specieController.getObservationsList)

module.exports = router;