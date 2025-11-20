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
        role: user.role,
        reputation: user.reputation,
        createdAt: user.createdAt
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header manquant" });
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        return res.status(401).json({ error: "Format Authorization invalide" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
            select: { id: true, email: true, username: true, role: true, reputation: true, createdAt: true }
        });
        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT error:", err);
        return res.status(401).json({ error: "Token invalide ou expiré" });
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