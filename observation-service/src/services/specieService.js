const SpecieRepository = require('../repository/SpecieRepository');
const ObservationRepository = require('../repository/ObservationRepository')
const ObservationHistoryRepository = require("../repository/ObservationHistoryRepository");

class SpecieService {
    async createSpecie(user, data){

        if(!data || !data.name){
            throw new Error("Le nom de l'espèce est obligatoire.");
        }

        if(await SpecieRepository.findByName(data.name)){
            throw new Error("Cette espèce existe déjà.");
        }

        const specie = await SpecieRepository.save(user.sub, data.name);

        if(!specie){
            throw new Error("Impossible de créer l'espèce.");
        }

        return {
            id: specie.id,
            authorId: specie.authorId,
            name: specie.name,
            rarityScore: specie.rarityScore,
            createdAt: specie.createdAt
        };
    }

    async getSpeciesList(sortedParam){
        let species = "";

        if(sortedParam && sortedParam === "rarity"){
            species = await SpecieRepository.findByRarity()
        } else {
            species = await SpecieRepository.findAll();
        }

        if(species.length < 0){
            throw new Error("Aucune espèce n'a été trouvée.")
        }

        return { species: species }
    }

    async getSpecieById(id){
        const specie = await SpecieRepository.findById(id)

        if(!specie){
            throw new Error("L'id n'existe pas.")
        }

        return {
            id: specie.id,
            authorId: specie.authorId,
            name: specie.name,
            rarityScore: specie.rarityScore,
            createdAt: specie.createdAt
        };
    }

    async getObservationList(id){
        const specie = await SpecieRepository.findById(id);
        if (!specie) {
            throw new Error("Cette espèce n'existe pas.");
        }

        const observations = await ObservationRepository.findBySpecieId(id);

        return observations.map(o => ({
            id: o.id,
            authorId: o.authorId,
            description: o.description,
            status: o.status,
            createdAt: o.createdAt
        }));
    }

    async getSpecieHistory(id){

        const specie = await SpecieRepository.findById(id);
        if(!specie){
            throw new Error("L'espèce recherchée n'existe pas.")
        }
        const history = await ObservationHistoryRepository.findBySpecieId(id);

        return { history: history }
    }
}

module.exports = new SpecieService();