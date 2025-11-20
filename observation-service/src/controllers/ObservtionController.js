const observationService = require('../services/observationService');

exports.createObservation = async (req, res, next) => {
    try {
        const response = await observationService.addObservation(req.user, req.body);
        return res.status(201).json(response)
    } catch (err) {
        next(err);
    }
};

exports.validate = async (req, res, next) => {
    try {
        const response = await observationService.updateObservationStatus(req.user, Number(req.params.id), "VALIDATED");
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.reject = async (req, res, next) => {
    try {
        const response = await observationService.updateObservationStatus(req.user, Number(req.params.id), "REJECTED");
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};