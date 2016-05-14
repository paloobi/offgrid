'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
      type: String
    },
    email: {
        type: String
    },
    facebook: {
        id: String
    }
});

mongoose.model('User', schema);