const apiRoutes = require('express').Router();
const { expressjwt } = require('express-jwt');

const userRoutes = require('./userRoutes');

// protect all api routes
apiRoutes.use('/', expressjwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	onExpired: '1h'
}))

apiRoutes.use('/users', userRoutes);

module.exports = apiRoutes;
