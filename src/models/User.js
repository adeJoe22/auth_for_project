const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Field is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Field is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password required'] },
    age: { type: Number },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;
