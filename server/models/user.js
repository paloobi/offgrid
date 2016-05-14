'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    facebook: {
        id: String
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', schema);