const bcrypt = require('bcrypt');
const { HTTP_STATUS, ERR_MESSAGES } = require('./constants');

const handleError = (error, res, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
	let response = {
		status: '',
	}

	if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
		response.status = 'fail';
		response.data = error;
		return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
	}

	if (statusCode === HTTP_STATUS.BAD_REQUEST) {
		response.status = 'fail';
		response.data = error;
		return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
	}

	if (statusCode === HTTP_STATUS.NOT_FOUND) {
		response.status = 'fail';
		response.data = { message: 'Resource not found' };
		return res.status(HTTP_STATUS.NOT_FOUND).json(response);
	}

	response.status = 'error';
	response.message = error.message || 'An error occurred'
	return res.status(statusCode).json(response);
};

const handleSuccess = (data, res, statusCode = HTTP_STATUS.OK) => {
	let response = {
		status: 'success',
		data
	};
	
	if (statusCode === HTTP_STATUS.CREATED) {
		return res.status(HTTP_STATUS.CREATED).json(response);
	}

	res.status(HTTP_STATUS.OK).json(response);
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