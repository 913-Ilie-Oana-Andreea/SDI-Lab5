const Location = require('../models/location.js')
const Concert = require('../models/concert.js')
const Artist = require("../models/artist");
const fs = require("fs");

module.exports = {
    populate,
    getAllLocations,
    getLocationByID,
    addLocation,
    deleteLocation,
    updateLocation,
    locationExists,
    filterByCapacity
}

function populate() {
    let generate = false;
    if(generate === true) {
        const fs = require('fs');

        let rawdata = fs.readFileSync('locations.json');
        let locations = JSON.parse(rawdata);
        for (let location of locations) {
            addLocation(location);
        }
    }
}

async function getAllLocations() {
    try{
        let location = await Location.find({});
        return location;
    }
    catch(error){
        throw error;
    }
}

async function getLocationByID(ID){
    try{
        let location = await Location.findById({_id: ID});
        return location;
    }
    catch(error){
        throw error;
    }
}

async function addLocation(params){
    try{
        //TODO: check location id in database
        let locationToAdd = await Location.create(params);
        return locationToAdd;
    } catch(error) {
        throw error;
    }
}

async function deleteLocation(ID){
    try{
        let locationToDelete = await Location.findByIdAndDelete({_id: ID});
        Concert.updateMany({ location: ID }, { $unset: { location: 1 } }, { multi: true }, next);
        return locationToDelete;
    }
    catch(error){
        throw error;
    }
}

async function updateLocation(ID, params){
    try{
        let locationToUpdate = await Location.findByIdAndUpdate({_id: ID}, params);
        return locationToUpdate;
    }
    catch(error){
        throw error;
    }
}


async function locationExists(ID){
    let location = await Location.exists({_id: ID});
    if (!location){
        return false;
    }
    return true;
}

async function filterByCapacity(capacity) {
    try {
        let location = await Location.find().gt('capacity', capacity);
        return location;
    } catch (error) {
        throw error;
    }
}