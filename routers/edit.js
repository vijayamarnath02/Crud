const express = require('express');
const router = express.Router();
const server = require('../module/details');
const { ObjectId } = require('mongodb');
router.use('/favicon.ico', function(req, res, next) {
  res.status(204).end();
});

router.get('/:id', function (req, res) {
  const id = req.params.id;

  server.findOne({ _id: ObjectId(id) })
    .exec()
    .then(function (result) {
      let a = JSON.stringify(result);
      res.render('edit', { topicHead: 'Edit Details Form', posts: result });
    })
    .catch(function (err) {
      console.log(JSON.stringify(err));
      res.status(500).send('Internal Server Error');
    });
});

router.get('/:id/save', function (req, res) {
  const id = req.params.id;
  let a = JSON.stringify(req.query);
  console.log(id);
  let name = req.query.name;
  let phno = req.query.phno;
  const email = req.query.email;
  let age = req.query.age;
  const dob = req.query.dob;
  age = +age;
  phno = +phno;
  const errors = [];
  server.findOne({ _id: ObjectId(id) })
    .exec()
    .then(function (req1, res1) {
      const check = req1.email;
      const  check3= req1._id;
      console.log(check3);

      if (check == email) {
        server.updateOne(
          { _id: ObjectId(id) },
          { $set: { name: name, phno: phno, dob: dob, age: age, email: email } }
        )
          .exec()
          .then(function (result) {
            console.log(result);
            res.redirect('/');
          })
          .catch(function (err) {
            console.log(JSON.stringify(err));
            res.status(500).send('Internal Server Error');
          });
      } else {
        server.findOne({ email: email })
          .exec()
          .then(function (req1, res1) {
                    console.log(req1);
if(req1 == null){
   server.updateOne(
                { _id: ObjectId(id) },
                { $set: { name: name, phno: phno, dob: dob, age: age, email: email } }
              )
                .exec()
                .then(function (result) {
                  console.log(result);
                  res.redirect('/');
                })
                .catch(function (err) {
                  console.log(JSON.stringify(err));
                  res.status(500).send('Internal Server Error');
                });
          }
          else{
            const check2 = req1.email;
            console.log(req1);
            if (check2 == email) {
             
              console.log("email is already having");
               console.log(email);
             res.redirect('/edit/'+id);
            }

             else {
              server.updateOne(
                { _id: ObjectId(id) },
                { $set: { name: name, phno: phno, dob: dob, age: age, email: email } }
              )
                .exec()
                .then(function (result) {
                  console.log(result);
                  res.redirect('/');
                })
                .catch(function (err) {
                  console.log(JSON.stringify(err));
                  res.status(500).send('Internal Server Error');
                });
            }
}
          });
      }
    });
});

module.exports = router;
