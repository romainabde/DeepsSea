const prisma = require("../prismaClient");

class SpecieRepository {
    async save(authorId, name){
        return await prisma.species.create({
            data: {
                authorId,
                name
            },
            select: {
                id: true,
                authorId: true,
                name: true,
                createdAt: true
            }
        });
    }

    async findAll(){
        return await prisma.species.findMany({
            select: {
                id: true,
                authorId: true,
                name: true,
                createdAt: true
            },
        });
    }

    async findById(id){
        return await prisma.species.findUnique({
            where: { id: id }
        });
    }

    async findByName(name){
        return await prisma.species.findUnique({
            where: { name: name }
        });
    }
}

module.exports = new SpecieRepository();