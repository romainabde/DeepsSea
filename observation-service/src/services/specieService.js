const SpecieRepository = require('../repository/SpecieRepository');

class SpecieService {
    async createSpecie(user, data){

        await this.checkSpecieName();
        await this.checkObservationCooldown();

    }

    async checkSpecieName(){
        // vérifier si data.name est vide
        // contrainte : Impossible de créer deux species du même nom
    }

    async checkObservationCooldown(){
        // contrainte : Impossible de soumettre deux observations de la même espèce dans un délai de cinq minutes

    }
}

module.exports = new SpecieService();