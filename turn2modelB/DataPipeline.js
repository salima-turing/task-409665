// Import existing code from previous steps

/**
 * @interface Subject
 */
class Subject {
    constructor() {
        this.observers = [];
    }

    /**
     * Attach an observer to the subject.
     * @param {Observer} observer - The observer to attach.
     */
    attachObserver(observer) {
        this.observers.push(observer);
    }

    /**
     * Detach an observer from the subject.
     * @param {Observer} observer - The observer to detach.
     */
    detachObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    /**
     * Notify all observers about an update.
     */
    notifyObservers() {
        this.observers.forEach(observer => observer.update());
    }
}

/**
 * @interface Observer
 */
class Observer {
    constructor() {
        this.subject = null;
    }

    /**
     * Set the subject for the observer.
     * @param {Subject} subject - The subject to observe.
     */
    setSubject(subject) {
        this.subject = subject;
    }

    /**
     * Update the observer when notified.
     */
    update() {
        throw new Error('Abstract method update() must be implemented.');
    }
}

/**
 * @module PhenotypeTracker
 * @description Tracks plant phenotypes based on processed data and notifies observers of significant changes.
 */
class PhenotypeTracker extends Subject {
    constructor() {
        super();
    }

    async trackPhenotypes(processedData) {
        // Mock implementation - replace with real tracking logic
        // For demonstration purposes, let's create random data for phenotype changes
        const phenotypeChanges = processedData.map(data => {
            const changedPhenotypes = {};
            const phenotypeParams = ['leafArea', 'stemHeight', 'chlorophyllContent'];

            phenotypeParams.forEach(param => {
                const randomChange = Math.random() * 20 - 10; // Generate random change between -10 and 10
                if (Math.abs(randomChange) >= 5) { // Consider a change significant if it's >= 5
                    changedPhenotypes[param] = randomChange;
                }
            });
            return { ...data, changedPhenotypes };
        });

        // Notify observers of significant phenotype changes
        phenotypeChanges.forEach(change => {
            if (Object.keys(change.changedPhenotypes).length > 0) {
                this.notifyObservers(change);
            }
        });

        return phenotypeChanges;
    }
}

/**
 * @module GrowthMonitor
 * @description Observes phenotype changes and updates plant growth records.
 */
class GrowthMonitor extends Observer {
    constructor() {
        super();
        this.growthRecords = [];
    }

    update(change) {
        // Update plant growth records based on the significant phenotype changes
        const { plantId, changedPhenotypes } = change;
        const existingRecord = this.growthRecords.find(record => record.plantId === plantId);

        if (existingRecord) {
            Object.assign(existingRecord, changedPhenotypes);
        } else {
            this.growthRecords.push({ plantId, ...changedPhenotypes });
        }
    }

    getGrowthRecords() {
        return this.growthRecords;
    }
}

// Export components
module.exports = {
    DataPipeline
}
