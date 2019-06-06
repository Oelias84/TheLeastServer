const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate, validateLogin} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});


router.post('/register', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email, name: req.body.name });
  
  let userEmail = await User.findOne({email: req.body.email})

  if (user || userEmail) {return res.status(400).send('User already registered.');
  }else {
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.save();
  }

  res.status(200).send('User register successfully');
});

router.post('/loginCheck', async (req, res) => {
  const { error } = validateLogin(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ name: req.body.name, password: req.body.password});
  if (res.error) return res.status(500).send();

  if (!user) return res.status(400).send('User not registered');

  if (!user.isLogged) return res.status(300).send('User is not logged');
    
  if (user.isLogged) return res.status(200).send('User loggedin');
});

router.put('/login', async (req, res) => {
  const { error } = validateLogin(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ name: req.body.name, password: req.body.password});
  if (res.error) return res.status(500).send();

  if (!user) return res.status(400).send('Not a registered User!');
  
  if (!user.isLogged){
    user.isLogged = true
  }
  
  user = await user.save();
  res.status(200).send('User loggedin');
});

router.put('/logout', async (req, res) => {
  const { error } = validateLogin(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ name: req.body.name, password: req.body.password});
  if (res.error) return res.status(500).send();

  if (!user) return res.status(400).send('Not a registered User!');
  
  if (user.isLogged){
    user.isLogged = false
  }
  
  user = await user.save();
  res.status(200).send('User loggedin');
});


module.exports = router; 
