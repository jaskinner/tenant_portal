const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE || 'tenant_portal',
	'root',
	process.env.MYSQL_ROOT_PASSWORD || 'root',
	{
		host: 'db',
		dialect: 'mysql'
	}
);

module.exports = sequelize;