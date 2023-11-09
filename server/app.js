const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./db/associations');

const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan('combined'));

// seed admin user
require('./db/seeders/initUserSeed')();

app.use('/api', apiRoutes);

module.exports = app;
