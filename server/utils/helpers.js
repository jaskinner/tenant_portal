const bcrypt = require('bcrypt');
const { HTTP_STATUS, ERR_MESSAGES } = require('./constants');
const { Sequelize } = require('sequelize');

const handleError = (error, res, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
	if (statusCode === HTTP_STATUS.BAD_REQUEST || error instanceof Sequelize.ValidationError) {
		return res.status(HTTP_STATUS.BAD_REQUEST).json(error);
	}

	if (statusCode === HTTP_STATUS.NOT_FOUND) {
		return res.status(HTTP_STATUS.NOT_FOUND).json(error);
	}

	return res.status(statusCode).json(error);
};

const handleSuccess = (data, res, statusCode = HTTP_STATUS.OK) => {
	if (statusCode === HTTP_STATUS.CREATED) {
		return res.status(HTTP_STATUS.CREATED).json(data);
	}
	
	res.status(HTTP_STATUS.OK).json(data);
}

const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
}

module.exports = {
	handleError,
	handleSuccess,
	hashPassword,
	HTTP_STATUS,
	ERR_MESSAGES
}