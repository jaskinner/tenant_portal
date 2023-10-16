const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

module.exports = () => {
	return sequelize.define('User', {
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password_hash: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		},
	})
}