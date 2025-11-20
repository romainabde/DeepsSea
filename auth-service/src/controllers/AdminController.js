const adminService = require('../services/adminService');

exports.getUsers = async (req, res, next) => {
    try {
        const response = await adminService.getUsers()
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};