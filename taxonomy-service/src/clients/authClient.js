const axios = require("axios");

const AUTH_URL = process.env.OBSERVATION_SERVICE_URL || "http://localhost:4001";

async function loginApi(username, password) {
    const res = await axios.post(
        "http://localhost:4001/auth/login",
        {
            identifier: username, // ou email selon ton API
            password: password
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if(!res.data) {
        throw new Error("Erreur lors de la connexion au micro-service auth.");
    }

    return res.data;
}

module.exports = { loginApi };