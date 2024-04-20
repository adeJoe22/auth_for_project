const express = require('express');
const {
  signUp,
  getUsers,
  logIn,
  userProfile,
} = require('../controllers/userController');

const userRoute = express.Router();

userRoute.post('/signup', signUp);
userRoute.post('/login', logIn);
userRoute.get('/', getUsers);
userRoute.get('/:id', userProfile);

module.exports = userRoute;
