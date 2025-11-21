const prisma = require("../prismaClient");
class ObservationHistoryRepository {
    async save(observationId, userId, action) {
        return await prisma.observationHistory.create({
            data: {
                observationId,
                userId,
                action
            },
            select: {
                id: true,
                observationId: true,
                userId: true,
                action: true,
                createdAt: true
            }
        });
    }

    async findByUserId(userId) {
        return await prisma.observationHistory.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });
    }

    async findBySpecieId(speciesId){
        return await prisma.observationHistory.findMany({
            where: { observation: { speciesId: speciesId } }
        });
    }
}

module.exports = new ObservationHistoryRepository();