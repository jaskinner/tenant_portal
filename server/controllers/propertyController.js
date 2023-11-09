const { HTTP_STATUS, ERR_MESSAGES, hashPassword, handleError, handleSuccess } = require('../utils/helpers');

exports.getAllProperties = (Property) => async (req, res) => {
	try {
		const properties = await Property.findAll();

		handleSuccess({ properties: properties }, res)
	} catch (error) {
		handleError(error, res)
	}
};

exports.getPropertyByOwner = (Property) => async (req, res) => {
	// const ownerId = req.user_id;



	try {
		const property = await Property.findOne({ where: { owner_id: 3 } });

		if (!property) return handleError(ERR_MESSAGES.PROPERTY_NOT_FOUND, res, HTTP_STATUS.NOT_FOUND);

		handleSuccess({ property: property }, res);
	} catch (error) {
		handleError(error, res);
	}
};

exports.createProperty = (Property) => async (req, res) => {
	const { owner_id, address, city, state, zip, category, status } = req.body;

	try {
		const newProperty = await Property.create({ owner_id, address, city, state, zip, category, status });

		handleSuccess({ property: newProperty }, res, HTTP_STATUS.CREATED);
	} catch (error) {
		handleError(error, res);
	}
}
