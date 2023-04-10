const concertModel = require('../models/concert.js');
const Controller = require("../controllers/concertController");
const ArtistConcertController = require("../controllers/artistConcertController");
const express = require('express');
const router = express.Router();
/*
module.exports = (app) => {
    const Controller = require('../controllers/concertController.js');
    Controller.populate();
    app.get('/concert/getAllConcerts', Controller.getAllConcerts);
    app.get('/concert/getConcertByID/:ID', ArtistConcertController.getConcertArtistsDetails);
    app.post('/concert/addConcert', Controller.addConcert);
    app.delete('/concert/deleteConcert/:ID', Controller.deleteConcert);
    app.put('/concert/updateConcert/:ID', Controller.updateConcert);
    //app.get('/concert/:ID/getArtistConcert', ArtistConcertController.getArtistConcertDetails)
    app.post('/concert/:ID/addArtist', ArtistConcertController.addArtistToConcert)
    app.delete('/concert/:concertID/deleteArtist/:artistID', ArtistConcertController.deleteArtistFromConcert)
    app.put('/concert/:concertID/updateArtist/:artistID', ArtistConcertController.updateArtistInConcert)
}*/

router.get('/getAllConcerts', Controller.getAllConcerts);
router.get('/getConcertByID/:ID', ArtistConcertController.getConcertArtistsDetails);
router.post('/addConcert', Controller.addConcert);
router.delete('/deleteConcert/:ID', Controller.deleteConcert);
router.put('/updateConcert/:ID', Controller.updateConcert);
//app.get('/concert/:ID/getArtistConcert', ArtistConcertController.getArtistConcertDetails)
router.post('/:ID/addArtist', ArtistConcertController.addArtistToConcert)
router.delete('/:concertID/deleteArtist/:artistID', ArtistConcertController.deleteArtistFromConcert)
router.put('/:concertID/updateArtist/:artistID', ArtistConcertController.updateArtistInConcert)

module.exports = router;