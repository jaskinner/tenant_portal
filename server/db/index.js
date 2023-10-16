const { Sequelize } = require('sequelize');
const UserModel = require('./models/User')

const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE || 'tenant_portal',
	'root',
	process.env.MYSQL_ROOT_PASSWORD || 'root', {
	host: 'db',
	dialect: 'mysql'
});

const User = UserModel(sequelize);

module.exports = { sequelize, User };