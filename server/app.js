const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const { userController } = require('./controllers/userController')
const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(router);

module.exports = app;
