const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = Schema({
    name: {
        required: true,
        type: String,
        validate: {
            validator: (name) => name.trim().length > 3,
            message: _ => 'Name must be at least 3 characters long'
        }
    },

    city: {
        required: true,
        type: String,
        validate: {
            validator: (city) => city.trim().length > 3,
            message: _ => 'City must be at least 3 characters long'
        }
    },

    address: {
        required: true,
        type: String,
        validate: {
            validator: (address) => address.trim().length > 3,
            message: _ => 'Address must be at least 3 characters long'
        }
    },

    capacity: {
        required: true,
        type: Number,
        min: [1, 'Capacity must be a positive number']
    },

    description: {
        type: String
    },

    contact: {
        required: true,
        type: String
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;