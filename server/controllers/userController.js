const User = require('../db/models/User');
const { HTTP_STATUS, hashPassword, handleError, handleSuccess } = require('../utils/helpers');

exports.getUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		handleSuccess({ users: users }, res);
	} catch (error) {
		handleError(error, res);
	}
}

exports.getUser = async (req, res) => {
	const id = req.params.id;

	try {
		const user = await User.findByPk(id);

		if (!user) return handleError({ message: 'User not found' }, res, HTTP_STATUS.NOT_FOUND);

		handleSuccess({ user: user }, res);
	} catch (error) {
		handleError(error, res);
	}
}

exports.createUser = async (req, res) => {
	try {
		const { username, password, role } = req.body;
		const password_hash = await hashPassword(password);

		const newUser = await User.create({ username, password_hash, role });

		handleSuccess({ user: newUser }, res, HTTP_STATUS.CREATED);
	} catch (error) {
		handleError(error, res);
	}
}

exports.updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const { username, password, role } = req.body;

		let updateData = {};

		if (username !== undefined) {
			updateData.username = username;
		}

		if (password !== null && password !== undefined) {
			updateData.password_hash = await hashPassword(password);
		}

		if (role !== undefined) {
			updateData.role = role;
		}

		const [updated] = await User.update(updateData, { where: { user_id: id } });

		if (updated) {
			const updatedUser = await User.findOne({ where: { user_id: id } });
			if (updatedUser) {
				return handleSuccess({ user: updatedUser }, res);
			}
		}

		handleError({ message: 'Update failed or user not found' }, res);
	} catch (error) {
		handleError(error, res);
	}
}

exports.deleteUser = async (req, res) => {
	const id = req.params.id;

	if (!id) return handleError({ message: 'Invalid ID' }, res, HTTP_STATUS.BAD_REQUEST);

	try {
		const user = await User.findByPk(id);

		if (!user) return handleError({ message: 'User not found' }, res, HTTP_STATUS.NOT_FOUND);

		await User.destroy({ where: { user_id: id } });

		handleSuccess({ message: 'User deleted successfully' }, res);
	} catch (error) {
		handleError(error, res);
	}
}
