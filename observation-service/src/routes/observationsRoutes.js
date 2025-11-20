const express = require("express");
const observationController = require('../controllers/ObservationController');
const { requireRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', observationController.createObservation)

router.post('/:id/validate', requireRole("EXPERT", "ADMIN"), observationController.validate)
router.post('/:id/reject', requireRole("EXPERT", "ADMIN"), observationController.reject)

module.exports = router;