const UserRepository = require('../repository/userRepository');

class UserService {
    async setUserRole (userId, data) {
        if(!data || !data.role){
            throw new Error("Le role est requis.")
        }

        const allowedRoles = ["USER", "EXPERT", "ADMIN"];

        if (!allowedRoles.includes(data.role)) {
            throw new Error(`Rôle invalide : ${data.role}. Les rôles valides sont ${allowedRoles.join(", ")}.`);
        }

        if(!await UserRepository.findById(userId)) throw new Error("Utilisateur non trouvé.")

        const user = UserRepository.updateRole(userId, data.role)

        return { users: user }
    }

    async setUserReputation (userId, data){
        if(!data || !data.reputation){
            throw new Error("Le role est requis.")
        }

        const user = await UserRepository.findById(userId);

        const newReputation = user.reputation + data.reputation;
        let newRole = user.role;

        if (newReputation >= 10 && user.role !== "EXPERT") {
            newRole = "EXPERT";
        }

        return await UserRepository.update(userId, {
            reputation: newReputation,
            role: newRole
        });

    }
}

module.exports = new UserService();