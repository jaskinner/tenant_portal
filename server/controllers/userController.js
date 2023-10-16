const users = [];

const dbMock = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 500));

module.exports = async (req, res) => {
	const allUsers = await dbMock(users);
	res.json(allUsers);
}