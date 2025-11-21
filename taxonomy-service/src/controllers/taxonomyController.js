const taxonomyService = require('../services/taxonomyService');

exports.getStats = async (req, res, next) => {
    try {
        const response = await taxonomyService.generateStats();
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};