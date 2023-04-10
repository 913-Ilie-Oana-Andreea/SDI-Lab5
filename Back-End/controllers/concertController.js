const Concert = require('../models/concert.js')
const Service = require('../services/concertService.js')
const Artist = require('../models/artist.js')
const ArtistConcertService = require('../services/artistConcertService.js')

module.exports = {
    populate,
    getAllConcerts,
    getConcertByID,
    addConcert,
    deleteConcert,
    updateConcert
}

function populate() {
    try {
        Service.populate();
    }
    catch(error){
        console.log(error.message)
    }
}

async function getAllConcerts(req, res) {
    try{
        let concerts = await Service.getAllConcerts();
        res.status(200).json(concerts)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

async function getConcertByID(req, res) {
    try{
        let {ID} = req.params;
        let concertArtists = await Service.getConcertByID(ID);

        res.status(200).json(concertArtists)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addConcert(req, res) {
    try{
        let concertToAdd = await Service.addConcert(req.body);
        res.status(200).json(concertToAdd)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

async function deleteConcert (req, res)  {
   try{
         let concertID = req.params.ID;
         let concert = await Service.deleteConcert(concertID);
         //let concertToDeleteFromArtists = await Artist.updateMany({concerts: concertID}, {$pull: {concerts: concertID}});
         let concertToDeleteFromArtists = await ArtistConcertService.deleteConcertFromItsArtists(concertID);
       res.status(200).json(concert)
   } catch(error) {
         res.status(400).json({message: error.message})
   }
}

async function updateConcert(req, res) {
   try{
            let {ID} = req.params;
            let concert = await Service.updateConcert(ID, req.body);
            let concertToUpdateInArtists = await ArtistConcertService.updateConcertInArtist(ID, req.body);
            res.status(200).json(concert)
   } catch(error) {
            res.status(400).json({message: error.message})
   }
}

async function getLocation(req, res) {
    try{
        let {ID} = req.params;
        let location = await Location.findById(ID);
        res.status(200).json(location)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function getArtist(req, res) {
    try{
        let {ID} = req.params;
        let artist = await Artist.findById(ID);
        res.status(200).json(artist)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}