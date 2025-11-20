const axios = require("axios");

const AUTH_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4001";

async function updateReputation(userId, reputation, token) {
    return await axios.patch(`${AUTH_URL}/users/${userId}/reputation`,
        { userId, reputation },
        { headers: { Authorization: token } }
    );
}

module.exports = { updateReputation };