const Concert = require('../models/concert.js')
const Service = require('../services/artistConcertService.js')
const Artist = require('../models/artist.js')
const ArtistServcie = require('../services/artistService.js')
const concertService = require('../services/concertService.js')
const ArtistConcert = require("../models/artistConcert");

module.exports = {
    populate,
    //getArtistConcert,
    getConcertArtistsDetails,
    getArtistConcertsDetails,
    addArtistToConcert,
    addConcertToArtist,
    deleteArtistFromConcert,
    deleteConcertFromArtist,
    updateArtistInConcert,
    updateConcertInArtist,
    generateReport,
    generateReport2
}

/*
async function getArtistConcert(req, res) {
    try{
        let artistConcert = await Service.getArtistConcert();
        res.status(200).json(artistConcert)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}
*/

function populate() {
    Service.populate();
}

async function getConcertArtistsDetails(req, res) {
    let concertID = req.params.ID;
    let artistConcert = await Service.getConcertArtistsDetails(concertID);
    res.status(200).json(artistConcert)
}

async function getArtistConcertsDetails(req, res) {
    let artistID = req.params.ID;
    let concertArtist = await Service.getArtistConcertsDetails(artistID);
    res.status(200).json(concertArtist)
}


async function addArtistToConcert(req, res) {
    let artistConcertToAdd = await Service.addArtistToConcert(req.body);
    res.status(200).json(artistConcertToAdd)
}

async function addConcertToArtist(req, res) {
    let concertArtistToAdd = await Service.addConcertToArtist(req.body);
    res.status(200).json(concertArtistToAdd)
}


async function deleteArtistFromConcert (req, res)  {
    let concertID = req.params.concertID;
    let artistID = req.params.artistID;
    let concert = await Service.deleteArtistFromConcert(concertID, artistID);
    res.status(200).json(concert)
}

async function deleteConcertFromArtist (req, res)  {
    let artistID = req.params.artistID;
    let concertID = req.params.concertID;
    let artist = await Service.deleteConcertFromArtist(artistID, concertID);
    res.status(200).json(artist)
}


async function updateArtistInConcert(req, res) {
    let concertID = req.params.concertID;
    let artistID = req.params.artistID;
    let concert = await Service.updateArtistInConcert(concertID, artistID, req.body);
    res.status(200).json(concert)
}

async function updateConcertInArtist(req, res) {
    let artistID = req.params.artistID;
    let concertID = req.params.concertID;
    let artist = await Service.updateConcertInArtist(artistID, concertID, req.body);
    res.status(200).json(artist)
}

async function generateReport(req, res) {
    const sortedArtistStats = await Service.generateReport();
    res.status(200).json(sortedArtistStats)
}

async function generateReport2(req, res) {
   const sortedArtistStats = await Service.generateReport2();
   res.status(200).json(sortedArtistStats)
}