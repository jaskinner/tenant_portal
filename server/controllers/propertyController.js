const { HTTP_STATUS, ERR_MESSAGES, hashPassword, handleError, handleSuccess } = require('../utils/helpers');

exports.getAllProperties = (Property) => async (req, res) => {
	try {
		const properties = await Property.findAll();

		handleSuccess({ properties: properties }, res)
	} catch (error) {
		handleError(error, res)
	}
}