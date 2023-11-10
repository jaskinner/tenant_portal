const { User, Property } = require('../db/associations');
const { HTTP_STATUS, ERR_MESSAGES, hashPassword, handleError, handleSuccess } = require('../utils/helpers');

exports.getPropertiesByOwner = (User, Property) => async (req, res) => {
	
}
