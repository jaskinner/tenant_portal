const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const seeds = require('./db/seeders/initUserSeed');
const userseed = seeds.seeduser();
const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan('combined'));
app.use('/api', router);

module.exports = app;
