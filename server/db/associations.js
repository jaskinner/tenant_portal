const Property = require("./models/Property");
const User = require("./models/User");

User.hasMany(Property, {
	foreignKey: 'owner_id',
	as: 'properties'
});

Property.belongsTo(User, {
	foreignKey: 'owner_id',
	as: 'owner'
});

Property.belongsTo(User, {
	foreignKey: 'tenant_id',
	as: 'tenant'
})

module.exports = { User, Property }