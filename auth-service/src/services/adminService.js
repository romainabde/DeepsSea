const UserRepository = require('../repository/userRepository');

class AdminService {
    async getUsers () {
        let users = await UserRepository.getAll()
        if(users.length < 0){
            throw new Error("Aucun utilisateur n'a été trouvé.")
        }

        return { users: users }
    }
}

module.exports = new AdminService();