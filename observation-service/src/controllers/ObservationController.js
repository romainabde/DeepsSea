const observationService = require('../services/observationService');

exports.getObservationsList = async (req, res, next) => {
    try {
        const response = await observationService.getObservationsList();
        return res.status(201).json(response)
    } catch (err) {
        next(err);
    }
}

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
        const response = await observationService.updateObservationStatus(req.user, Number(req.params.id), "VALIDATED", req.headers.authorization);
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.reject = async (req, res, next) => {
    try {
        const response = await observationService.updateObservationStatus(req.user, Number(req.params.id), "REJECTED", req.headers.authorization);
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.safeDelete = async (req, res, next) => {
    try {
        const response = await observationService.safeDelete(req.user.sub, Number(req.params.id));
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.getUserHistory = async (req, res, next) => {
    try {
        const response = await observationService.getUserHistory(Number(req.params.id));
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.restoreObservation = async (req, res, next) => {
    try {
        const response = await observationService.restoreObservation(req.user.sub, Number(req.params.id));
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};