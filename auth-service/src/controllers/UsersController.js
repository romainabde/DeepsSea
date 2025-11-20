const userService = require('../services/userService');

exports.setUserRole = async (req, res, next) => {
    try {
        const response = await userService.setUserRole(Number(req.params.id), req.body)
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.setUserReputation = async (req, res, next) => {
    try{
        const response = await userService.setUserReputation(Number(req.params.id), req.body)
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
}