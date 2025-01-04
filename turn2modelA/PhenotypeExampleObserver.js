const { PhenotypeObserver, PlantPhenotype } = require('./PhenotypeObserver');

// Example observer that logs changes
function logPhenotypeChange(data) {
    console.log(`[Observer] ${data.message}`);
}

// Create observer and plant phenotype instance
const observer = new PhenotypeObserver();
const plantPhenotype = new PlantPhenotype(observer);

// Subscribe the logging observer
observer.subscribe(logPhenotypeChange);

// Simulate updates to phenotype parameters
plantPhenotype.updatePhenotype({ leafArea: 60 }); // Should trigger notification
plantPhenotype.updatePhenotype({ stemHeight: 35 }); // Should trigger notification
plantPhenotype.updatePhenotype({ chlorophyllContent: 3 }); // Should not trigger notification
plantPhenotype.updatePhenotype({ chlorophyllContent: 6 }); // Should trigger notification
