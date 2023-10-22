const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use('/api', router);

module.exports = app;
