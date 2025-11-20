// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");

const JWT_SECRET = process.env.JWT_SECRET || "DEV_SECRET_CHANGE_ME";
const JWT_EXPIRES_IN = "2h";

function generateToken(user) {
    const payload = {
        sub: user.id,
        email: user.email,
        username: user.username,
        role: user.role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        throw new Error("Token manquant ou invalide.");
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        return next();
    } catch (err) {
        throw new Error("Token invalide ou expiré.");
    }
}

function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "L'utilisateur n'est pas authentifié" });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Accès refusé" });
        }
        next();
    };
}

module.exports = {
    authMiddleware,
    generateToken,
    requireRole
};