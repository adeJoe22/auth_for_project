const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/auth-flow-class';

const dbServer = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log(`DB is connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbServer;
