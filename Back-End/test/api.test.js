const mongoose = require('mongoose');
const locationService = require('../services/locationService');
const artistConcertService = require('../services/artistConcertService');

beforeEach(async () => {
    await mongoose.connect('mongodb+srv://cranberries:MareParola@cluster0.eytfjtp.mongodb.net/test');
})

afterEach(async () => {
    await mongoose.connection.close();
})

describe('Filter by capacity', () => {
    it('should return all locations with capacity greater than 50000', async () => {
        const locations = await locationService.filterByCapacity(50000);
        location = {
            "name": "Arena Nationala",
            "city": "Bucuresti",
            "address": "Bd. Carol I, nr. 1, Sector 1",
            "capacity": 55634,
            "description": "Arena Națională is a retractable roof football stadium in Bucharest, Romania. It opened in 2011 on the site of the original National Stadium, which was demolished between 2007 and 2008. ",
            "contact": "0723 614 302"
        }
        expect(locations.length).toBe(1);
        expect(locations[0]).toMatchObject(location);
    })
})

/*
describe('Generate report ', () => {
    it('should return a list of the artists that have concerts more than 1 location', () => {
        const artists = artistConcertService.generateReport2();
        expect(artists.length).toBe(3);
        expect(artists[0]).toMatchObject({name: "Vita de Vie", noOfLocations: 2});
        expect(artists[1]).toMatchObject({name: "Alternosfera", noOfLocations: 2});
        expect(artists[2]).toMatchObject({name: "Coma", noOfLocations: 2});
    })
})
*/