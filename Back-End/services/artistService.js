const Artist = require('../models/artist.js')
const concertService = require('../services/concertService.js')
const Location = require("../models/location");
const ArtistConcert = require("../models/artistConcert");

module.exports = {
    populate,
    getAllArtists,
    getArtistByID,
    addArtist,
    deleteArtist,
    updateArtist,
    artistExists
}

function populate() {
    let generate = false;
    if(generate === true) {
        const fs = require('fs');

        let rawdata = fs.readFileSync('artists.json');
        let artists = JSON.parse(rawdata);

        for (let artist of artists) {
            addArtist(artist);
        }
    }
}

async function getAllArtists() {
    try{
        let artist = await Artist.find({});
        return artist;
    }
    catch(error){
        throw error;
    }
}

async function getArtistByID(ID){
    try{
        let artist = await Artist.findById({_id: ID});
        return artist;
    }
    catch(error){
        throw error;
    }
}


async function addArtist(params){
    try{
        let artistToAdd = await Artist.create(params);
        return artistToAdd;
    } catch(error) {
        throw error;
    }
}

async function deleteArtist(ID){
    try{
        let artistToDelete = await Artist.findByIdAndDelete({_id: ID});
        //let artistToDeleteFromConcerts = await ArtistConcert.deleteMany({artist: ID})
        return artistToDelete;
    }
    catch(error){
        throw error;
    }
}

async function updateArtist(ID, params){
    try{
        let artistToUpdate = await Location.findByIdAndUpdate({_id: ID}, params);
        //let artistToUpdateInConcerts = await ArtistConcert.updateMany({artist: ID}, params);
        return artistToUpdate;
    }
    catch(error){
        throw error;
    }
}

async function artistExists(ID){
    let artist = await Artist.exists({_id: ID});
    if (!artist){
        return false;
    }
    return true;
}