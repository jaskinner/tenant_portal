const { Sequelize } = require('sequelize');

// TODO: fix db connection with fresh user not root
const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.MYSQL_HOST || 'db',
	username: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'root',
	database: process.env.MYSQL_DATABASE || 'tenant_portal',
});

module.exports = sequelize;