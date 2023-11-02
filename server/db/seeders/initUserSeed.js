const { hashPassword } = require('../../utils/helpers')
const User = require('../../db/models/User')

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
	})

	return { adminUser, tenantUser };
}

module.exports = seeduser