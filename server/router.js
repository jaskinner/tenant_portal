const express = require('express');
const router = express.Router();
const { userController } = require('./controllers');

// USER Routes
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
