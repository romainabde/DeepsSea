const express = require("express");
const usersController = require('../controllers/UsersController');
const { requireRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.patch('/:id/role', requireRole("ADMIN"), usersController.setUserRole)
router.patch('/:id/reputation', requireRole("EXPERT", "ADMIN"), usersController.setUserReputation)

module.exports = router;