const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const User = require('../models/user')

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ login: req.body.login }).then(user => {
    if (user) {
      errors.login = 'Login already exists';
      return res.status(400).json(errors);
    } else {

      const newUser = new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
        img: req.body.img,
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  console.log(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const login = req.body.login;
  const password = req.body.password;
  // Find user by login
  User.findOne({ login }).then(user => {
    // Check for user
    if (!user) {
      errors.login = 'Пользователь не найден';
      return res.status(404).json(errors);
    }

    // Check Password
    user.comparePassword(password, (err, isMatch) => {
        if(err) {
            return done(err);
        }
        if (isMatch) {
          // User Matched
          const payload = { id: user._id, name: user.name }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 86400 }, //24hours
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Неправильный пароль';
          return res.status(400).json(errors);
        }
    });
  });
});


router.put('/editUserInfo', async (req, res) => {
    const user = User.findById(req.user._id)
    if(req.body.name) user.name = req.body.name
    if(req.body.login) user.login = req.body.login
    if(req.body.img) user.img = req.body.img
    await user.save()
    res.status(200).send(user)
});


module.exports = router
