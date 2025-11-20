const observationService = require('../services/observationService');

exports.createObservation = async (req, res, next) => {
    try {
        const response = "";
        return res.status(201).json(response)
    } catch (err) {
        next(err);
    }
};

exports.validate = async (req, res, next) => {
    try {
        const response = "";
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.reject = async (req, res, next) => {
    try {
        const response = "";
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};