const { fetchObservations, fetchSpecies } = require('../clients/observationClient');
const { loginApi } = require('../clients/authClient')

class TaxonomyService {

    async generateStats(){

        let token = await loginApi("admin", "admin");
        token = token.token;

        let species = await fetchSpecies(token);
        species = species.species;
        let observations = await fetchObservations(token);
        observations = observations.observations

        const obsCountMap = await this.countObservationsBySpecies(observations);

        const avg =
            observations.length > 0
                ? observations.length / species.length
                : 0;

        const keywords = await this.extractKeywords(observations);

        const classification = await this.generateClassification(species, obsCountMap);

        return {
            speciesCount: species.length,
            observationCount: observations.length,
            averageObservationsPerSpecies: avg,
            observationsPerSpecies: obsCountMap,
            keywordFrequency: keywords,
            classification
        };
    }

    async countObservationsBySpecies(observations) {
        const map = {};
        for (const obs of observations) {
            map[obs.speciesId] = (map[obs.speciesId] || 0) + 1;
        }
        return map;
    }

    async extractKeywords(observations) {
        const stopwords = ["grand", "petit", "agressif", "pacifique"];
        const freq = {};

        for (const obs of observations) {
            const words = obs.description.toLowerCase().split(/\W+/);

            for (const w of words) {
                if (!w) continue;

                if (stopwords.includes(w)) {
                    freq[w] = (freq[w] || 0) + 1;
                }
            }
        }

        return freq;
    }


    async generateClassification(speciesList, obsCountMap) {
        return speciesList.map(s => {

            const obsCount = obsCountMap[s.id] || 0;

            // famille selon la rareté
            const famille =
                s.rarityScore >= 10 ? "Primordiaux Abyssaux" :
                    s.rarityScore >= 5 ? "Anciens des Profondeurs" :
                        s.rarityScore >= 3 ? "Habitants des Fosse" :
                            "Lignée Commune des Récifs";

            // sous-espèce selon le nombre d’observations
            const sousEspece =
                obsCount >= 20 ? `${s.name} — Variante Majeure` :
                    obsCount >= 10 ? `${s.name} — Variante Mineure` :
                        `${s.name} — Forme de Base`;

            // branche évolutive
            const brancheEvolution =
                `Branche-${Math.floor((s.id * 7 + s.rarityScore) % 12)}`;

            return {
                nom: s.name,
                famille,
                sousEspece,
                brancheEvolution
            };
        });
    }




}

module.exports = new TaxonomyService();