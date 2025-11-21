const prisma = require("../prismaClient");

class ObservationRepository {
    async save(speciesId, authorId, description){
        return await prisma.observation.create({
            data: {
                speciesId,
                authorId,
                description
            },
            select: {
                id: true,
                speciesId: true,
                authorId: true,
                description: true,
                status: true,
                createdAt: true
            }
        });
    }

    async getById(id){
        return await prisma.observation.findUnique({
            where: { id: id, deleted: false }
        });
    }

    async getAllById(id){
        return await prisma.observation.findUnique({
            where: { id: id }
        });
    }

    async update(observationId, key, value) {

        const allowedKeys = ["status", "validatedBy", "validatedAt", "description", "deleted", "deletedAt"];

        if (!allowedKeys.includes(key)) {
            throw new Error(`Impossible de modifier la colonne ${key}`);
        }

        const data = {};
        data[key] = value;

        return await prisma.observation.update({
            where: { id: observationId },
            data,
            select: {
                id: true,
                speciesId: true,
                authorId: true,
                description: true,
                status: true,
                validatedBy: true,
                validatedAt: true,
                createdAt: true
            }
        });
    }

    async findRecent(authorId, speciesId) {
        const dateLimit = new Date(Date.now() - 5 * 60 * 1000);

        return prisma.observation.findFirst({
            where: {
                authorId,
                speciesId,
                createdAt: { gte: dateLimit }
            },
            orderBy: { createdAt: "desc" }
        });
    }

    async findAll(){
        return await prisma.observation.findMany({
            where: {
                deleted: false
            },
            select: {
                id: true,
                speciesId: true,
                authorId: true,
                description: true,
                status: true,
                validatedBy: true,
                validatedAt: true,
                createdAt: true
            },
        });
    }

    async findBySpecieId(specieId) {
        return await prisma.observation.findMany({
            where: {
                speciesId: specieId,
                deleted: false
            },
            orderBy: { createdAt: "desc" }
        });
    }
}

module.exports = new ObservationRepository();