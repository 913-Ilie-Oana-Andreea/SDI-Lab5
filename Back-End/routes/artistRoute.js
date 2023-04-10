const artistModel = require('../models/artist.js');
const Controller = require("../controllers/artistController");
const ArtistConcertController = require("../controllers/artistConcertController");
const Artist = require("../models/artist");

module.exports = (app) => {
    const Controller = require('../controllers/artistController.js');
    Controller.populate();
    ArtistConcertController.populate();
    app.get('/artist/getAllArtists', Controller.getAllArtists);
    app.get('/artist/getArtistByID/:ID', ArtistConcertController.getArtistConcertsDetails);
    app.post('/artist/addArtist', Controller.addArtist);
    app.delete('/artist/deleteArtist/:ID', Controller.deleteArtist);
    app.put('/artist/updateArtist/:ID', Controller.updateArtist);
    app.post('/artist/:ID/addConcert', ArtistConcertController.addConcertToArtist)
    app.delete('/artist/:artistID/deleteConcert/:concertID', ArtistConcertController.deleteConcertFromArtist)
    app.put('/artist/:artistID/updateConcert/:concertID', ArtistConcertController.updateConcertInArtist)

    app.get('/artist/getAverageTicketPrice', ArtistConcertController.generateReport)
    app.get('/artist/getNoOfLocations', ArtistConcertController.generateReport2)

}