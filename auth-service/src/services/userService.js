const UserRepository = require('../repository/userRepository');

class UserService {
    async setUserRole (userId, data) {
        if(!data || !data.role){
            throw new Error("Le role est requis.")
        }

        // vérifier le rôle (USER, EXPERT, ADMIN)

        if(!await UserRepository.findById(userId)) throw new Error("Utilisateur non trouvé.")

        const user = UserRepository.updateRole(userId, data.role)

        return { users: user }
    }
}

module.exports = new UserService();