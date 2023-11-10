const propertyRoutes = require('express').Router();
const propertyController = require('../controllers/propertyController');

const { Property } = require('../db/associations');

propertyRoutes.get('/', propertyController.getPropertiesByOwner(Property));

module.exports = propertyRoutes;
