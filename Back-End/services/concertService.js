const Concert = require('../models/concert.js')
const ArtistConcert = require('../models/artistConcert.js')
const LocationService = require('../services/locationService.js')
const ArtistService = require('../services/artistService.js')
const Artist = require("../models/artist");
const fs = require("fs");

module.exports = {
    populate,
    getAllConcerts,
    getConcertByID,
    addConcert,
    deleteConcert,
    updateConcert,
    concertExists
}

function populate() {
    let generate = false;
    if(generate === true) {
        const fs = require('fs');

        let rawdata = fs.readFileSync('concerts.json');
        let concerts = JSON.parse(rawdata);

        for (let concert of concerts) {
            addConcert(concert);
        }
    }
}

async function getAllConcerts() {
    try{
        let concert = await Concert.find({});
        return concert;
    }
    catch(error){
        throw error;
    }
}

async function getConcertByID(ID){
    try{
        let concert = await Concert.findById({_id: ID});
        return concert;
    }
    catch(error){
        throw error;
    }
}


async function addConcert(params){
    try{
        let locationID = params.location;
        let location = await LocationService.locationExists(locationID);

        if(!location){
            throw new Error(`No location with id ${locationID} exists in the database`);
        }

        let concertToAdd = await Concert.create(params);
        return concertToAdd;
    } catch(error) {
           throw error;
       }
}

async function deleteConcert(ID){
    try{
        let concert = await Concert.findByIdAndDelete({_id: ID});
        return concert;
    }
    catch(error){
        throw error;
    }
}

async function updateConcert(ID, params){
    try{
        let concert = await Concert.findByIdAndUpdate({_id: ID}, params);
        return concert;
    }
    catch(error){
        throw error;
    }
}

async function concertExists(ID){
    let concert = await Concert.exists({_id: ID});
    if (!concert){
        return false;
    }
    return true;
}