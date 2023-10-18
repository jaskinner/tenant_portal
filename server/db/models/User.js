const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('User', {
	user_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isAlphanumeric: true
		}
	},
	password_hash: {
		type: DataTypes.STRING,
		allowNull: false
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = User;
