const bcrypt = require('bcrypt');
const { HTTP_STATUS } = require('./constants');
const { Sequelize } = require('sequelize');

const handleError = (error, res) => {
	if (error instanceof Sequelize.ValidationError) {
		return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: `Internal Server Error: ${error}` });
	}

	return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: `Internal Server Error: ${error}` });
}

const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
}

module.exports = {
	handleError,
	hashPassword,
	HTTP_STATUS
}