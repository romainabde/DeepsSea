const ObservationRepository = require('../repository/ObservationRepository');
const SpecieRepository = require('../repository/SpecieRepository');

class ObservationService {
    async addObservation(user, data){
        if(!data || !data.description || !data.speciesId){
            throw new Error("speciesId et description sont requis.")
        }

        const specie = await SpecieRepository.findById(data.speciesId);
        if(!specie){
            throw new Error(`speciesId (${data.speciesId}) not found.`);
        }

        await this.checkObservationCooldown(user.sub, data.speciesId);

        const observation = await ObservationRepository.save(data.speciesId, user.sub, data.description);

        if(!observation){
            throw new Error("Impossible de créer une nouvelle observation.");
        }

        return {
            id: observation.id,
            speciesId: observation.speciesId,
            authorId: observation.authorId,
            description: observation.description,
            status: observation.status,
            createdAt: observation.createdAt
        };
    }

    async updateObservationStatus(user, observationId, value){
        let observation = await ObservationRepository.getById(observationId)
        if(!observation){
            throw new Error("L'observation recherchée n'existe pas.");
        }

        if(observation.authorId === user.sub){
            throw new Error("Vous ne pouvez pas modifier le statut de votre observation.");
        }

        observation = await ObservationRepository.update(observationId, "status", value);
        observation = await ObservationRepository.update(observationId, "validatedBy", user.sub);
        observation = await ObservationRepository.update(observationId, "validatedAt", new Date());

        return {
            id: observation.id,
            speciesId: observation.speciesId,
            authorId: observation.authorId,
            description: observation.description,
            status: observation.status,
            validatedBy: observation.validatedBy,
            validatedAt: observation.validatedAt,
            createdAt: observation.createdAt
        }
    }

    async checkObservationCooldown(userId, speciesId){
        const recent = await ObservationRepository.findRecent(userId, speciesId);
        if(recent){
            throw new Error("Vous avez déjà soumis une observation pour cette espèce il y a moins de 5 minutes.");
        }
    }
}

module.exports = new ObservationService();