const SpecieRepository = require('../repository/SpecieRepository');

class SpecieService {
    async createSpecie(user, data){

        if(!data || !data.name){
            throw new Error("Le nom est obligatoire.");
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
            createdAt: specie.createdAt
        };
    }

    async getSpeciesList(){
        const species = await SpecieRepository.findAll();

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
            createdAt: specie.createdAt
        };
    }
}

module.exports = new SpecieService();