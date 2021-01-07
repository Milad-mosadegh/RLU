var express = require('express');
const mongoose = require('mongoose')
const RegisterModel = require('../model/registerModel');
var router = express.Router();
/* require('dotenv').config()


mongoose.connect(process.env.MONGODBURL,
  {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }, () => {
    console.log("Connected to MongoDB");
  })
 */

/* GET users listing. */
router.post('/register', function (req, res, next) {
  let inputData = req.body;

  let userModel = new RegisterModel({
    fname: inputData.fname,
    lName: inputData.lname,
    email: inputData.email,
    password: inputData.password
  });
  userModel.save().then(result => {
    res.send({ message: true, result })
    console.log(result);
  }).catch(err => {
    res.send({ message: false, err })
  })
});



router.post('/login', function (req, res, next) {
  let inputData = req.body;
  RegisterModel.find(inputData)
    .then(result => {
      if (result.length > 0) {
        res.send({ login: true, result })
        loggedUser = result[0].email
      } else {
        res.send({ login: false })
        loggedUser = ""
      }
    })
});

let loggedUser = "";
console.log(loggedUser);

router.get('/all', function (req, res, next) {
  RegisterModel.find({ email: loggedUser })
    .select("fname lname email password")
    .then(result => {
      res.send(result)
      console.log(result);
    })

});

router.put('/update', function (req, res, next) {
  let inputData = req.body;

  RegisterModel.findOneAndUpdate(inputData.email, { fname: inputData.fname, lname: inputData.lname, email: inputData.email, password: inputData.password })
    .then(result => {
      res.send(result)
    })
});


module.exports = router;