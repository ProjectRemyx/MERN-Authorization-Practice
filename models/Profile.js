const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    //Connect to an existing user id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);