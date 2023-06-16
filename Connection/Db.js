var express = require('express');
var router = express.Router();
var server = require('../module/details');

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected successfully');
});






module.exports = router;