const locationModel = require('../models/location.js');
const Controller = require("../controllers/locationController");
const express = require('express');
const router = express.Router();
/*
module.exports = (app) => {
    const Controller = require('../controllers/locationController.js');
    Controller.populate();
    app.get('/location/getAllLocations', Controller.getAllLocations);
    app.get('/location/getLocationByID/:ID', Controller.getLocationByID);
    app.post('/location/addLocation', Controller.addLocation);
    app.delete('/location/deleteLocation/:ID', Controller.deleteLocation);
    app.put('/location/updateLocation/:ID', Controller.updateLocation);
    app.get('/location/filterByCapacity/:capacity', Controller.filterByCapacity);
}
*/

router.get('/getAllLocations', Controller.getAllLocations);
router.get('/getLocationByID/:ID', Controller.getLocationByID);
router.post('/addLocation', Controller.addLocation);
router.delete('/deleteLocation/:ID', Controller.deleteLocation);
router.put('/updateLocation/:ID', Controller.updateLocation);
router.get('/filterByCapacity/:capacity', Controller.filterByCapacity);

module.exports = router;
