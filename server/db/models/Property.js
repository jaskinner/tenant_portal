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
		allowNull: false
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
	category: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	},
});

// TODO: Create association to owner
// Property.belongsTo()

module.exports = Property;