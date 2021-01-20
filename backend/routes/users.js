var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const RegisterModel = require('../model/registerModel');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, cb) {
    cb(null,
      file.originalname.split('.')[0] + "-" + Date.now() + "." + file.mimetype.split('/')[1]
    )
  }
})

let upload = multer({
  storage: storage,
  // limits: { fileSize: 1000000 } //bite
})


/*
 
 ██████╗ ███████╗ ██████╗ ██╗███████╗████████╗███████╗██████╗ 
 ██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══╝  ██╔══██╗
 ██║  ██║███████╗╚██████╔╝██║███████║   ██║   ███████╗██║  ██║
 ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                              
 
*/

router.post('/register', upload.single("file"), async function (req, res, next) {
  let inputData = req.body;

  let emails = await RegisterModel.find({ email: req.body.email })

  req.check("fname", "First Name must be at least 3 Characters")
    .trim()
    .isLength({ min: 3, max: 20 })
    .isAlpha()
    .withMessage("First Name should be Alphabet")

  req.check("lname", "Last Name must be at least 3 Characters")
    .trim()
    .isLength({ min: 3, max: 20 })
    .isAlpha()
    .withMessage("Last Name should be Alphabet")

  req.check("email")
    .isEmail()
    .normalizeEmail()
    .custom((value) => {
      return emails.length === 0
    })
    .withMessage("This Email is already Token!!!!")


  // req.check("password").not().isEmpty()


  let err = req.validationErrors()
  if (err) {
    res.send({ success: false, errMsg: err })
    console.log(" Errors", err)
  } else {
    let userModel = new RegisterModel({
      fname: inputData.fname,
      lname: inputData.lname,
      email: inputData.email,
      password: inputData.password,
      profileImg: "http://localhost:8000/" + req.file.path
    });

    userModel.save()
      .then(result => {
        res.send({ success: true, result })
        console.log(result)
      }).catch(err => {
        console.log(err);
      })
  }


});



/*
 
 ██╗      ██████╗  ██████╗ ██╗███╗   ██╗
 ██║     ██╔═══██╗██╔════╝ ██║████╗  ██║
 ██║     ██║   ██║██║  ███╗██║██╔██╗ ██║
 ██║     ██║   ██║██║   ██║██║██║╚██╗██║
 ███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║
 ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝
                                        
 
*/

router.post('/login', function (req, res, next) {
  let inputData = req.body;

  RegisterModel.find(inputData)
    .then(result => {
      // if (inputData.email !== result.email) {
      //   res.send({ msg: "email is not matched" });
      // } else if (inputData.password !== result.password) {
      //   res.send({ msg: "Password is not matched" });
      // }
      if (result.length > 0) {
        req.session.isLoggedIn = true
        res.send({ login: true, session: req.session.isLoggedIn, result })
        loggedUser = result[0].email
      } else {
        res.send({ login: false })
        loggedUser = ""
      }
    })
});


let loggedUser = "";
console.log("loggedUser", loggedUser);


/*
 
  ██████╗ ███████╗████████╗    ██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗
 ██╔════╝ ██╔════╝╚══██╔══╝    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝
 ██║  ███╗█████╗     ██║       ██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗  
 ██║   ██║██╔══╝     ██║       ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝  
 ╚██████╔╝███████╗   ██║       ██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗
  ╚═════╝ ╚══════╝   ╚═╝       ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝
                                                                                   
 
*/

router.get('/all', function (req, res, next) {
  RegisterModel.find({ email: loggedUser })
    .select("fname lname email password profileImg")
    .then(result => {
      res.send(result)
      console.log("get Method result", result);
    })
});


/*
 
 ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗    ██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗
 ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝
 ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗      ██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗  
 ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝      ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝  
 ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗    ██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗
  ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝
                                                                                                           
 
*/

router.put('/update', upload.single('file'), function (req, res, next) {
  let inputData = req.body;

  RegisterModel.updateOne({ email: inputData.email },
    { fname: inputData.fname, lname: inputData.lname, email: inputData.email, password: inputData.password, profileImg: "http://localhost:3001/" + req.file.path })
    .then(result => {
      res.send(result)
    })
});


module.exports = router;