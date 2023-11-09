const { DataTypes } = require('sequelize');
const db = require('../db');

const Property = db.define('Property', {
	property_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	owner_id: {
		type: DataTypes.INTEGER,
	},
	tenant_id: {
		type: DataTypes.INTEGER,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false
	},
	state: {
		type: DataTypes.STRING,
		allowNull: false
	},
	zip: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = Property;