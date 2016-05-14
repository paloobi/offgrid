'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    facebook: {
        id: String
    }
});

mongoose.model('User', schema);