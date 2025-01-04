const { DataPipeline, MolecularDataProcessor, PhenotypeTracker } = require('./DataPipeline');

describe('DataPipeline', () => {
    let pipeline;
    let mockMolecularProcessor;
    let mockPhenotypeTracker;

    beforeEach(() => {
        mockMolecularProcessor = new MolecularDataProcessor();
        mockPhenotypeTracker = new PhenotypeTracker();
        pipeline = new DataPipeline(mockMolecularProcessor, mockPhenotypeTracker);
    });

    test('should process molecular data and track phenotypes', async () => {
        const molecularData = [{ marker: 'A' }, { marker: 'B' }];

        const results = await pipeline.processMolecularData(molecularData);

        expect(results).toEqual([
            { marker: 'A', processed: true, tracked: true },
            { marker: 'B', processed: true, tracked: true },
        ]);
    });

    test('should throw error for invalid input', () => {
        const invalidInputs = [null, {}, '', [], []];

        invalidInputs.forEach(input => {
            expect(() => {
                pipeline.validateInput(input);
            }).toThrow('Invalid input: expected a non-empty array.');
        });
    });

    test('should handle errors during processing', async () => {
        const molecularData = [{ marker: 'A' }];

        // Mock failed processing
        jest.spyOn(mockMolecularProcessor, 'process').mockImplementationOnce(() => {
            throw new Error('Failed to process molecular data');
        });

        await expect(pipeline.processMolecularData(molecularData))
            .rejects.toThrow('Data processing failed');
    });
});
