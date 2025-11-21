const ObservationRepository = require('../repository/ObservationRepository');
const ObservationHistoryRepository = require('../repository/ObservationHistoryRepository')
const SpecieRepository = require('../repository/SpecieRepository');
const { updateReputation } = require("../clients/authClient");

class ObservationService {
    async getObservationsList(){
        const observations = await ObservationRepository.findAll();
        if(observations.length < 0){
            throw new Error("Aucune observation n'a été trouvée.")
        }

        return { observations: observations }
    }

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

    async updateObservationStatus(user, observationId, value, token){
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

        let reputationChanges = 0;
        if(value === "VALIDATED"){
            let specie = await SpecieRepository.findById(observation.speciesId);
            let newRarityScore = 1 + specie.rarityScore / 5;

            await SpecieRepository.update(specie.id, "rarityScore", newRarityScore)

            reputationChanges = 3;
        }else{
            reputationChanges = -1
        }
        await updateReputation(observation.authorId, reputationChanges, token)

        console.log(observationId)
        console.log(user.sub)
        console.log(value)
        await ObservationHistoryRepository.save(observationId, user.sub, value)

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

    async safeDelete(userId, observationId){
        let observation = await ObservationRepository.getById(observationId)
        if(!observation){
            throw new Error("L'observation recherchée n'existe pas.");
        }

        observation = await ObservationRepository.update(observationId, "deleted", true);
        observation = await ObservationRepository.update(observationId, "deletedAt", new Date());

        await ObservationHistoryRepository.save(observationId, userId, "DELETED");

        return { observation: observation }
    }

    async getUserHistory(userId){

        // vérifier si l'user existe
        const history = await ObservationHistoryRepository.findByUserId(userId);

        return { history: history }
    }

    async restoreObservation(userId, obsId){
        let observation = await ObservationRepository.getAllById(obsId);
        if(!observation){
            throw new Error("L'observation recherchée n'existe pas.");
        }

        if(observation.deleted === false){
            throw new Error("L'observation " + obsId + " n'est pas archivée.");
        }

        observation = await ObservationRepository.update(obsId, "deleted", false);
        observation = await ObservationRepository.update(obsId, "deletedAt", null);

        await ObservationHistoryRepository.save(obsId, userId, "RESTORED");

        return { observation: observation }
    }
}

module.exports = new ObservationService();