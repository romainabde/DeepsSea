const AuthRepository = require('../repository/userRepository');
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/authMiddleware");

class AuthService {
    async login (data) {
        if (!data.identifier || !data.password) {
            throw new Error("L'identifiant et le mot de passe sont requis.");
        }

        let user = await AuthRepository.findByEmail(data.identifier)
        if(!user){
            user = await AuthRepository.findByUsername(data.identifier)
        }
        if(!user){
            throw new Error("Email ou nom d'utilisateur incorrect.")
        }

        if(!await bcrypt.compare(data.password, user.password)){
            throw new Error("Mot de passe incorrect.")
        }

        const safeUser = { // Ne pas retourner le mdp
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            reputation: user.reputation,
            createdAt: user.createdAt
        };

        const token = generateToken(safeUser);

        return { user: safeUser, token: token }
    }

    async register(data){
        if (!data.email || !data.username || !data.password) {
            throw new Error("email, username and password are required");
        }

        if(await AuthRepository.findByUsername(data.username)){
            throw new Error("Le nom d'utilisateur existe déjà.")
        }

        if(await AuthRepository.findByEmail(data.email)){
            throw new Error("L'adresse e-mail existe déjà.")
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const user = await AuthRepository.save(data.email, data.username, passwordHash, "USER", 0)

        if(!user){
            throw new Error("Impossible de créer un utilisateur.");
        }

        const safeUser = { // Ne pas retourner le mdp
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role ? user.role : "USER",
            reputation: user.reputation ? user.reputation : 0,
            createdAt: user.createdAt
        };

        const token = generateToken(safeUser);

        return { user: safeUser, token: token }
    }
}

module.exports = new AuthService();