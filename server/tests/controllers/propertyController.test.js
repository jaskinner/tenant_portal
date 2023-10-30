const propertyController = require('../../controllers/propertyController');
const { HTTP_STATUS } = require('../../utils/constants');

PropteryArrayMock = [
	{
		property_id: 1,
		owner_id: 1,
		address: "123 Main St",
		city: "Maintown",
		state: "ST",
		zip: "12345",
		category: "Residential",
		status: "Occupied"
	},
	{
		property_id: 2,
		owner_id: 1,
		address: "5000 Smith Ave",
		city: "Maintown",
		state: "ST",
		zip: "12315",
		category: "Residential",
		status: "Occupied"
	},
	{
		property_id: 3,
		owner_id: 1,
		address: "333 Barn Blvd",
		city: "Maintown",
		state: "ST",
		zip: "12545",
		category: "Residential",
		status: "Occupied"
	},
];

const PropertyMock = {
	findAll: jest.fn().mockReturnValue(PropteryArrayMock),
	findByPk: jest.fn((id) => {
		return PropteryArrayMock[id]
	}),
	create: jest.fn((newPropertyData) => {
		return {
			property_id: Math.floor(Math.random() * 100),
			...newPropertyData
		};
	}),
};

describe("Property Operations: Create, Read, Update, Delete", () => {

	test('Should retrieve a property ID successfully', async () => {
		const id = 1;
		const req = { params: { id: id } };
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const getPropertyWithMock = propertyController.getProperty(PropertyMock);
		await getPropertyWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: {
				property: PropteryArrayMock[id]
			}
		}

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json).toHaveBeenCalledWith(expectedResponse);
	});

	test('Should get all properties successfully', async () => {
		const req = {};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const getAllPropertiesWithMock = propertyController.getAllProperties(PropertyMock);
		await getAllPropertiesWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: {
				properties: PropteryArrayMock
			}
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json).toHaveBeenCalledWith(expectedResponse);
	});

	test('Should create a property successfully', async () => {
		const req = {
			body: {
				owner_id: 1,
				address: "456 Cola Ln",
				city: "Newtownh",
				state: "PL",
				zip: "54321",
				category: "Residential",
				status: "Vacant"
			}
		};

		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const createPropertyWithMock = propertyController.createProperty(PropertyMock);
		await createPropertyWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: {
				property: {
					property_id: expect.any(Number),
					owner_id: 1,
					address: "456 Cola Ln",
					city: "Newtownh",
					state: "PL",
					zip: "54321",
					category: "Residential",
					status: "Vacant"
				}
			}
		}

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
		expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
	});
});
