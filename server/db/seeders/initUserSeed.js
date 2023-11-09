const { hashPassword } = require('../../utils/helpers');
const { User, Property } = require('../associations');

const seeduser = async () => {
	const adminUser = await User.create({
		username: "admin",
		password_hash: await hashPassword("admin"),
		role: "admin"
	});

	const tenantUser = await User.create({
		username: "tenant",
		password_hash: await hashPassword("tenant"),
		role: "tenant"
	});

	const ownerUser = await User.create({
		username: "owner",
		password_hash: await hashPassword("owner"),
		role: "owner"
	});

	const seedProperty = await Property.create({
		address: "123 smith road",
		city: "Raleigh",
		state: "NC",
		zip: "27609",
	});

	await seedProperty.setOwner(ownerUser);
	await seedProperty.setTenant(tenantUser);

	return { adminUser, tenantUser, ownerUser, seedProperty };
}

module.exports = seeduser