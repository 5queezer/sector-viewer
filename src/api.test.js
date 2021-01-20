import getSectorInfo from './api';

test('test example api call', () => {
    const args = {
        sector: 'sector1',
        startDate: 1582904000000,
        endDate: 1582904375000,
        resolution: 10,
        valueNames: ['value0', 'value1', 'value2']
    };

    return getSectorInfo(args).then( res => {
        expect(res.status).toBe(200);
        expect(res.data.sectorName).toBe(args.sector);
    });

});
