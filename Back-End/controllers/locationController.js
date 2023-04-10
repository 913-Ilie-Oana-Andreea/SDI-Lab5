const Location = require('../models/location.js')
const Service = require('../services/locationService.js')

module.exports = {
    populate,
    getAllLocations,
    getLocationByID,
    addLocation,
    deleteLocation,
    updateLocation,
    filterByCapacity
}

function populate() {
    try {
        Service.populate();
    }
    catch(error){
        console.log(error.message)
    }
}

async function getAllLocations(req, res) {
    try{
        let concerts = await Service.getAllLocations();
        res.status(200).json(concerts)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

async function getLocationByID(req, res) {
    try{
        let {ID} = req.params;
        let concert = await Service.getLocationByID(ID);
        res.status(200).json(concert)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addLocation(req, res) {
    try{
        let locationToAdd = await Service.addLocation(req.body);
        res.status(200).json(locationToAdd)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

async function deleteLocation(req, res)  {
    try{
        let {ID} = req.params;
        let location = await Service.deleteLocation(ID);
        res.status(200).json(location)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function updateLocation(req, res) {
    try{
        let {ID} = req.params;
        let location = await Service.updateLocation(ID, req.body);
        res.status(200).json(location)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function filterByCapacity(req, res) {
    try{
        let capacity = req.params.capacity;
        let location = await Service.filterByCapacity(capacity);
        res.status(200).json(location)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}