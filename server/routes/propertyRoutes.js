const propertyRoutes = require('express').Router();
const propertyController = require('../controllers/propertyController');

const Property = require('../db/models/Property');

propertyRoutes.get('/', propertyController.getAllProperties(Property));
// propertyRoutes.get('/:id', propertyController.getUser(User));
// propertyRoutes.post('/', propertyController.createUser(User));
// propertyRoutes.put('/:id', propertyController.updateUserById(User));
// propertyRoutes.delete('/:id', propertyController.deleteUser(User));

module.exports = propertyRoutes;