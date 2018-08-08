const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport');
const generator = require('generate-password');
const mailer = require('../mailer');

require('../passport')(passport)

const User = require('../models/user')
const config = require('../config.js')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/signup', (req, res) => {

  console.log("GOT IT", req.body)
  if (!req.body.email || !req.body.group || !req.body.role || !req.body.institution) {
    return res.status(400).json({
      success: false,
      msg: 'Email, group, institution ou role absent'
    })
  }

  var password = generator.generate({ length: 10, numbers: true });

  const newUser = new User({
    email: req.body.email,
    group: req.body.group,
    role: req.body.role,
    institution: req.body.institution,
    password
  })


  newUser.save(function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        msg: 'Username already exists.'
      })
    }


    res.status(200).json({
      success: true,
      msg: 'Successful created new user.'
    })

    mailer.send("Compte POP créé avec succès",
      req.body.email,
      `
      Votre compte a été créé avec succès. 
      Votre mot de passe temporaire est ${password}. 
      Changez le dès que possible ici http://blabla
      Thanks !
      `)
  })
})

router.post('/signin', (req, res) => {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      })
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          const token = jwt.sign({ _id: user._id }, config.secret)
          res.json({
            success: true,
            token: 'JWT ' + token
          })
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          })
        }
      })
    }
  })
})

router.post('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({
    success: true,
    msg: 'It works!'
  })
})

module.exports = router
