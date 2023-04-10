const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = Schema({
    name: {
        required: true,
        type: String,
        validate: {
            validator: (name) => name.trim().length > 3,
            message: _ => 'Name must be at least 3 characters long'
        }
    },

    manager: {
        required: true,
        type: String,
        validate: {
            validator: (manager) => manager.trim().length > 3,
            message: _ => 'Manager must be at least 3 characters long'
        }
    },

    members: {
        required: true,
        type: String,
        validate: {
            validator: (members) => members.trim().length > 3,
            message: _ => 'Members must be at least 3 characters long'
        }
    },

    genre: {
        required: true,
        type: String,
        validate: {
            validator: (genre) => genre.trim().length > 3,
            message: _ => 'Genre must be at least 3 characters long'
        }
    },

    category: {
        required: true,
        type: String
    }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;