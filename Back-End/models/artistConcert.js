const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistConcertSchema = mongoose.Schema({
    concert: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Concert"

    },

    artist: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Artist"

    },

    startTime: {
        required: true,
        type: Date
    },

    endTime: {
        required: true,
        type: Date
    },

    cost: {
        required: true,
        type: Number
    }
},
{
    timestamps: true
});

const ArtistConcert = mongoose.model('ArtistConcert', artistConcertSchema);

module.exports = ArtistConcert;
