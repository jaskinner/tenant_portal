const propertyRoutes = require('express').Router();
const propertyController = require('../controllers/propertyController');

const { Property } = require('../db/associations');

propertyRoutes.get('/', propertyController.getPropertyByOwner(Property));
// propertyRoutes.get('/', propertyController.getAllProperties(Property));
propertyRoutes.post('/', propertyController.createProperty(Property));

module.exports = propertyRoutes;
