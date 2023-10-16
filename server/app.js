const express = require('express');
const morgan = require('morgan');
const userController = require('./controllers/userController')
const app = express();

app.use(express.json())
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Home'));
app.get('/users', userController.getUser);

module.exports = app;
