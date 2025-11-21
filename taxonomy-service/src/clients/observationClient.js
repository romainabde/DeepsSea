const axios = require("axios");

const OBSERVATION_URL = process.env.OBSERVATION_SERVICE_URL || "http://localhost:4002";

async function fetchSpecies(token) {
    const res = await axios.get(
        `${OBSERVATION_URL}/species`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
}

async function fetchObservations(token) {
    const res = await axios.get(
        `${OBSERVATION_URL}/observations`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
}

module.exports = { fetchSpecies, fetchObservations };