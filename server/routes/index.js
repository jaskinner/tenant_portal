const apiRoutes = require('express').Router();
const { expressjwt } = require('express-jwt');

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const propertyRoutes = require('./propertyRoutes');

apiRoutes.use('/auth', authRoutes);

// protect all api routes
apiRoutes.use('/', expressjwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256']
}))

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/properties', propertyRoutes);

module.exports = apiRoutes;
