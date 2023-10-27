const authRoutes = require('express').Router();
const authController = require('../controllers/authController');

const User = require('../db/models/User');

authRoutes.post('/login', authController.login(User));

module.exports = authRoutes;
