var express = require('express');
var router = express.Router();
var server = require('../module/details');
var mongo = require('mongodb');
var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
router.use('/favicon.ico', function(req, res, next) {
  res.status(204).end();
});

router.post('/new', function(req, res) {
  
  res.render('create',{ topicHead: 'Add Details Form' })
});


router.get('/create', function(req, res) {
  const name = req.query.name;
  const phno = req.query.phno;
  const age = req.query.age;
  const dob = req.query.dob;
  const email = req.query.email;

  
  const errors = [];
  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }
     else if( !/^[A-Za-z0-9 ]+$/.test(name) || !/^([^0-9]*)$/.test(name))
     {
      errors.push('does not allow special letters');
     }
  if (!phno || phno.trim() === '') {
    errors.push('Phone number is required');
  } else if (!/^\d{10}$/.test(phno)) {
    errors.push('Invalid phone number (10 digits required)');
  } 
  if (!age || age.trim() === '') {
    errors.push('Age is required');
  } else if (!/^\d+$/.test(age)) {
    errors.push('Invalid age (numeric value required)');
  }
  if (!dob || dob.trim() === '') {
    errors.push('Date of birth is required');
  }
  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Invalid email address');
  }

  if (errors.length > 0) {
    res.render('create', { topicHead: 'Add Details Form', message: errors });
    console.log(errors);
  } else {
    const newData = new server({
      name: name,
      phno: phno,
      age: age,
      dob: dob,
      email: email

    });
server.findOne({ email : email}).exec()
    .then(function(result) {
      if(result === null){
          newData.save()
           res.redirect('/');
      }
      else{
      res.render('create',{ message: 'mail all ready executed',topicHead: "Add the details"});
    }
     
      
    });

   
  }
});
router.get('/vijay', function(req, res) {
  consle.log("vijay");
});


module.exports = router;
