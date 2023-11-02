const propertyRoutes = require('express').Router();
const propertyController = require('../controllers/propertyController');

const Property = require('../db/models/Property');

propertyRoutes.get('/', propertyController.getAllProperties(Property));
propertyRoutes.get('/:id', propertyController.getProperty(Property));
propertyRoutes.post('/', propertyController.createProperty(Property));
// propertyRoutes.put('/:id', propertyController.updateUserById(Property));
// propertyRoutes.delete('/:id', propertyController.deleteUser(Property));

module.exports = propertyRoutes;