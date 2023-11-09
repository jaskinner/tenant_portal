const userRoutes = require('express').Router();
const userController = require('../controllers/userController');
const { authVerify } = require('../controllers/authController');
const { User } = require('../db/associations');

userRoutes.get('/me', authVerify, userController.getMyUser(User));
userRoutes.get('/', userController.getAllUsers(User));
userRoutes.get('/:id', userController.getUser(User));
userRoutes.post('/', userController.createUser(User));
userRoutes.put('/:id', userController.updateUserById(User));
userRoutes.delete('/:id', userController.deleteUser(User));

module.exports = userRoutes;