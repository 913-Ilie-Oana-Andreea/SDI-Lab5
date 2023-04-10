const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const concertSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },

    location: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Location",
    },

    startTime: {
        required: true,
        type: Date,

    },

    endTime: {
        required: true,
        type: Date
    },

    openGatesTime: {
        required: true,
        type: Date
    },

    ticketPrice: {
        required: true,
        type: Number
    },

    organizer: {
        required: true,
        type: String
    }
},
{
    timestamps: true
});

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;