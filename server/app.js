const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// seed admin user
const seeduser = require('./db/seeders/initUserSeed')();

const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan('combined'));

app.use('/api', apiRoutes);

module.exports = app;
