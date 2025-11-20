const prisma = require("../prismaClient");

class UserRepository {
    async save(email, username, passwordHash, role, reputation){
        return await prisma.user.create({
            data: {
                email,
                username,
                password: passwordHash,
                role: role,
                reputation: reputation
            },
            select: {
                id: true,
                email: true,
                username: true,
                password: true,
                role: true,
                reputation: true,
                createdAt: true
            }
        });
    }

    async findById(id){
        return await prisma.user.findUnique({ where: { id: id } });
    }

    async findByEmail(email){
        return await prisma.user.findUnique({ where: { email: email } });
    }

    async findByUsername(username){
        return await prisma.user.findUnique({ where: { username: username } });
    }

    async getAll(){
        return await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                reputation: true,
                createdAt: true,
            },
        });
    }

    // Update

    async updateRole(userId, newRole){
        return prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                reputation: true,
                createdAt: true,
            },
        });
    }
}

module.exports = new UserRepository();