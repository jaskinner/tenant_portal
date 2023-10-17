const express = require('express');
const morgan = require('morgan');
const userController = require('./controllers/userController')
const app = express();

app.use(express.json())
app.use(morgan('combined'));

app.get('/users/:id', userController.getUser);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

module.exports = app;
