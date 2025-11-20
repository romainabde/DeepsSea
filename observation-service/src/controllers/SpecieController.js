const specieService = require('../services/specieService');

exports.createSpecie = async (req, res, next) => {
    try {
        const response = await specieService.createSpecie(req.user, req.body);
        return res.status(201).json(response)
    } catch (err) {
        next(err);
    }
};

exports.getSpeciesList = async (req, res, next) => {
    try {
        const response = await specieService.getSpeciesList(req.query.sorted);
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.getSpecie = async (req, res, next) => {
    try {
        const response = await specieService.getSpecieById(Number(req.params.id));
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};

exports.getObservationsList = async (req, res, next) => {
    try {
        const response = "";
        return res.status(200).json(response)
    } catch (err) {
        next(err);
    }
};