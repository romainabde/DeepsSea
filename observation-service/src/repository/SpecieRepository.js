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
                rarityScore: true,
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
                rarityScore: true,
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

    async findByRarity() {
        return await prisma.species.findMany({
            orderBy: { rarityScore: "desc" }
        });
    }

    async update(specieId, key, value) {

        const allowedKeys = ["name", "rarityScore"];

        if (!allowedKeys.includes(key)) {
            throw new Error(`Impossible de modifier la colonne ${key}`);
        }

        const data = {};
        data[key] = value;

        return await prisma.species.update({
            where: { id: specieId },
            data,
            select: {
                id: true,
                authorId: true,
                name: true,
                rarityScore: true,
                createdAt: true
            }
        });
    }
}

module.exports = new SpecieRepository();