const express = require('express');
const expressApp = require('./app');
const dbServer = require('./db');

const app = express();

const server = async () => {
  try {
    expressApp(app);
    await dbServer();
    app.listen(3030, () => {
      console.log('Server is running');
    });
  } catch (error) {
    console.log(error.message);
  }
};

server();
