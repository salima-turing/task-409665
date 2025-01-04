/**
 * @module PhenotypeObserver
 * @description Implements the Observer pattern for monitoring plant growth parameters.
 */

/**
 * PhenotypeObserver class.
 */
class PhenotypeObserver {
    constructor() {
        this.observers = [];
    }

    /**
     * Subscribe an observer to changes.
     * @param {Function} observer - The observer callback function.
     */
    subscribe(observer) {
        this.observers.push(observer);
    }

    /**
     * Unsubscribe an observer.
     * @param {Function} observer - The observer callback function.
     */
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    /**
     * Notify all subscribed observers.
     * @param {Object} data - The data to send to observers.
     */
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

/**
 * PlantPhenotype class.
 */
class PlantPhenotype {
    constructor(observer) {
        this.observer = observer;
        this.phenotypeParameters = {
            leafArea: 0,
            stemHeight: 0,
            chlorophyllContent: 0,
        };
        this.thresholds = {
            leafArea: 50,
            stemHeight: 30,
            chlorophyllContent: 5,
        };
    }

    /**
     * Update phenotype parameters and notify observers if thresholds are exceeded.
     * @param {Object} updates - New values for phenotype parameters.
     */
    updatePhenotype(updates) {
        Object.entries(updates).forEach(([key, value]) => {
            if (this.phenotypeParameters[key] !== undefined) {
                this.phenotypeParameters[key] = value;
                this.checkThreshold(key, value);
            }
        });
    }

    /**
     * Check if a parameter exceeds its threshold and notify observers.
     * @param {string} parameter - The parameter being checked.
     * @param {number} value - The current value of the parameter.
     */
    checkThreshold(parameter, value) {
        if (value > this.thresholds[parameter]) {
            this.observer.notify({
                parameter,
                value,
                message: `${parameter} exceeded threshold! Current value: ${value}`,
            });
        }
    }
}

// Export components
module.exports = { PhenotypeObserver, PlantPhenotype };
