const User = require('../db/models/User');
const { HTTP_STATUS, hashPassword, handleError } = require('../utils/helpers');

exports.getUser = async (req, res) => {
	const id = req.params.id;

	if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid ID' });

	try {
		const user = await User.findByPk(id);

		if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' });

		return res.status(HTTP_STATUS.OK).json({ user: user });
	} catch (error) {
		handleError(error, res);
	}
}

exports.createUser = async (req, res) => {
	try {
		const { username, password, role } = req.body;
		const password_hash = await hashPassword(password);

		const newUser = await User.create({ username, password_hash, role });

		return res.status(HTTP_STATUS.CREATED).json({
			message: 'User created successfully!',
			user: {
				user_id: newUser.user_id,
				username: newUser.username,
				role: newUser.role
			}
		});
	} catch (error) {
		return handleError(error, res);
	}
}

exports.updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const { username, password, role } = req.body;
		const password_hash = await hashPassword(password);

		const [updated] = await User.update({ username, password_hash, role }, { where: { user_id: id } });

		if (updated) {
			const updatedUser = await User.findOne({ where: { user_id: id } });
			return res.status(HTTP_STATUS.OK).json({ user: updatedUser });
		}

		return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' });
	} catch (error) {
		return handleError(error, res);
	}
}

exports.deleteUser = async (req, res) => {
	const id = req.params.id;

	if (!id) return res.status(400).json({ message: 'Invalid ID' });

	try {
		const user = await User.findByPk(id);

		if (!user) return res.status(404).json({ message: 'User not found' });

		await User.destroy({ where: { user_id: id } });

		return res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		return handleError(error, res);
	}
}
