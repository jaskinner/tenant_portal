const { hashPassword } = require('../../utils/helpers')
const User = require('../../db/models/User')

const seeduser = async () => {
	const user = await User.create({
		username: "admin",
		password_hash: await hashPassword("admin"),
		role: "admin"
	});

	return user;
}

module.exports = seeduser