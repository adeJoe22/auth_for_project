const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
// Signup - creating the user
const signUp = async (req, res) => {
  try {
    // const data = {
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   email: req.body.email,
    //   password: req.body.password,
    //   age: req.body.age
    // }

    const { firstName, lastName, email, password, age } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const isEmailExist = await UserModel.exists({ email });

    if (isEmailExist) {
      return res.status(404).json({ message: 'Email has been taken' });
    }
    const newUser = await UserModel.create({
      email,
      firstName,
      lastName,
      password: hash,
      age,
    });

    return res
      .status(200)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// login
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check user in our db
    const findUser = await UserModel.findOne({ email });
    if (findUser === null) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // compare the password
    const checkpass = await bcrypt.compare(password, findUser.password);
    if (!checkpass) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // tokenize the user
    const payload = {
      id: findUser._id,
      email: findUser.email,
    };

    const token = jwt.sign(payload, 'sailProjectAuthkey', {
      expiresIn: '5',
    });

    return res.status(200).json({ email: findUser.email, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// Users

const getUsers = async (req, res) => {
  try {
    console.log('Hello');
    return res.status(200).json({ message: 'Hello Users' });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//User Profile

const userProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findById({ _id: id });
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { signUp, getUsers, logIn, userProfile };
