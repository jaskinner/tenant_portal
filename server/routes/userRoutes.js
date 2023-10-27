const userRoutes = require('express').Router();
const userController = require('../controllers/userController');

const User = require('../db/models/User')

userRoutes.get('/', userController.getAllUsers(User));
userRoutes.get('/:id', userController.getUser(User));
userRoutes.post('/', userController.createUser(User));
userRoutes.put('/:id', userController.updateUserById(User));
userRoutes.delete('/:id', userController.deleteUser(User));

module.exports = userRoutes;