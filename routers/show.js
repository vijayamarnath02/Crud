var express = require('express');
var router = express.Router();
var server = require('../module/details');
var mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
 
router.use('/favicon.ico', function(req, res, next) {
  res.status(204).end();
});

router.get('/', function(req, res) {
  server
    .find({})
    .exec()
    .then((docs) => {
      res.render('index', { docs: docs });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(500).send('Internal Server Error');
    });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);

  server
    .deleteOne({ _id: mongo.ObjectID(id) })
    .then(function(result) {
      console.log('Successfully deleted');
      res.redirect('/');
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
