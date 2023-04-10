const Concert = require('../models/concert.js')
const ArtistConcert = require('../models/artistConcert.js')

const ArtistService = require('../services/artistService.js')
const ConcertService = require('../services/concertService.js')
const fs = require("fs");


module.exports = {
    populate,
    //getArtistConcert,
    getConcertArtistsDetails,
    getArtistConcertsDetails,
    addArtistToConcert,
    addConcertToArtist,
    deleteArtistFromConcert,
    deleteArtistFromItsConcerts,
    deleteConcertFromArtist,
    deleteConcertFromItsArtists,
    updateArtistInConcert,
    updateConcertInArtist,
    generateReport,
    generateReport2
}
/*
async function getArtistConcert() {
    try{
        let artistConcert = await ArtistConcert.find({});
        let artist = await ArtistService.getArtistByID(artistConcert.artist);
        artistConcert.artist = artist;
        return artistConcert;
    }
    catch(error){
        throw error;
    }
}
*/

function populate() {
    let generate = false;

    if(generate === true) {
        const fs = require('fs');

        let rawdata = fs.readFileSync('artistConcerts.json');
        let artistConcerts = JSON.parse(rawdata);

        for (let artistConcert of artistConcerts) {
            addArtistToConcert(artistConcert);
        }
    }
}
async function getConcertArtistsDetails(concertID){
    try{
        let concertArtists = await ArtistConcert.find({concert: concertID})
            .populate('concert')
            .populate('artist');
        return concertArtists;
    }
    catch(error){
        throw error;
    }

}

async function getArtistConcertsDetails(artistID){
    try{
        let artistConcerts = await ArtistConcert.find({artist: artistID})
            .populate('artist')
            .populate('concert');
        return artistConcerts;
    }
    catch(error){
        throw error;
    }

}

async function addArtistToConcert(params) {
    try{
        let artistID = params.artist;
        let artist = await ArtistService.artistExists(artistID);

        if(!artist){
            throw new Error(`No artist with id ${artistID} exists in the database`);
        }
        let concertArtistToAdd = await ArtistConcert.create(params);
        return concertArtistToAdd;
    }
    catch(error){
        throw error;
    }
}

async function addConcertToArtist(params) {
    try{
        let concertID = params.concert;
        let concert = await ConcertService.concertExists(concertID);

        if(!concert){
            throw new Error(`No concert with id ${concertID} exists in the database`);
        }
        let artistConcertToAdd = await ArtistConcert.create(params);
        return artistConcertToAdd;
    }
    catch(error){
        throw error;
    }
}


async function deleteArtistFromConcert(concertID, artistID){
    try{
        let artistConcert = await ArtistConcert.findOneAndDelete({concert: concertID, artist: artistID});
        return artistConcert;
    }
    catch(error){
        throw error;
    }
}

async function deleteArtistFromItsConcerts(artistID){
    try{
        let artistConcerts = await ArtistConcert.deleteMany({artist: artistID});
        return artistConcerts;
    }
    catch(error){
        throw error;
    }
}


async function deleteConcertFromArtist(artistID, concertID){
    try{
        let concertArtist = await ArtistConcert.findOneAndDelete({artist: artistID, concert: concertID});
        return concertArtist;
    }
    catch(error){
        throw error;
    }
}

async function deleteConcertFromItsArtists(concertID){
    try{
        let concertArtists = await ArtistConcert.deleteMany({concert: concertID});
        return concertArtists;
    }
    catch(error){
        throw error;
    }
}


async function updateArtistInConcert(concertID, artistID, params){
    try{
        let artistConcert = await ArtistConcert.updateMany({concert: concertID, artist: artistID}, params);

        return artistConcert;
    }
    catch(error){
        throw error;
    }
}

//TODO: modify to find and update all the concerts of an artist
async function updateConcertInArtist(artistID, concertID, params){
    try{
        let concertArtist = await ArtistConcert.updateMany({artist: artistID, concert: concertID}, params);

        return concertArtist;
    }
    catch(error){
        throw error;
    }
}

async function generateReport(){
    try {
        const stats = await ArtistConcert.aggregate([
            {
                $lookup: {
                    from: 'artists',
                    localField: 'artist',
                    foreignField: '_id',
                    as: 'artist'
                }
            },
            {
                $lookup: {
                    from: 'concerts',
                    localField: 'concert',
                    foreignField: '_id',
                    as: 'concert'
                }
            },
            {
                $unwind: '$concert'
            },
            {
                $group: {
                    _id: '$artist',
                    totalTicketPrice: {$sum: '$concert.ticketPrice'},
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                    artist: {$arrayElemAt: ['$_id', 0]},
                    averageTicketPrice: {$divide: ['$totalTicketPrice', '$count']},
                    _id: 0
                }
            },
            {
                $sort: {averageTicketPrice: -1}
            }
        ]);

        let artistStats = []
        for (let i in stats) {
            let newArtist = stats[i].artist
            newArtist.averageTicketPrice = stats[i].averageTicketPrice
            artistStats.push(newArtist);
        }

        return artistStats
    } catch (error) {
        throw error;
    }
}

async function generateReport2(){
    try {
        const stats = await ArtistConcert.aggregate([
            {
                $lookup: {
                    from: 'artists',
                    localField: 'artist',
                    foreignField: '_id',
                    as: 'artist'
                }
            },
            {
                $lookup: {
                    from: 'concerts',
                    localField: 'concert',
                    foreignField: '_id',
                    as: 'concert'
                }
            },
            {
                $unwind: '$concert'
            },
            { $group: { _id: '$artist', noOfLocations: { $addToSet: '$concert.location' } } },

            { $project: { artist: '$_id', noOfLocations: { $size: '$noOfLocations' }, _id: 0 } },
            {
                $match: {
                    noOfLocations: { $gt: 1 },
                },
            },
            {
                $sort: {noOfLocations: 1}
            }
        ]);

        let artistStats = []
        for (let i in stats) {
            let newArtist = stats[i].artist[0]
            newArtist.noOfLocations = stats[i].noOfLocations

            artistStats.push(newArtist);
        }


        return artistStats
    } catch (error) {
        throw error;
    }
}