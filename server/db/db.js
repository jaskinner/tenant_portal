const { Sequelize } = require('sequelize');


const db = new Sequelize({
	dialect: 'mysql',
	host: 'db',
	username: 'app_user',
	password: 'password',
	database: 'tenant_portal',
});

module.exports = db;