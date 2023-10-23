const userController = require('../../controllers/userController');
const { HTTP_STATUS, ERR_MESSAGES } = require('../../utils/constants');

UserArrayMock = [
	{ user_id: 1, username: 'owneruser', password_hash: 'password', role: 'owner' },
	{ user_id: 2, username: 'manageruser', password_hash: 'password', role: 'manager' },
	{ user_id: 3, username: 'tenantuser', password_hash: 'password', role: 'tenant' }
];

const UserMock = {
	findAll: jest.fn().mockReturnValue(UserArrayMock),
	findByPk: jest.fn((id) => {
		return UserArrayMock[id];
	}),
	create: jest.fn((newUser) => {
		return {
			user_id: Math.floor(Math.random() * 100),
			...newUser
		}
	}),
	update: jest.fn((updateData, options) => {
		const id = options.where.user_id;
		if (!id) {
			return [0];
		}
		UserArrayMock[id] = { ...UserArrayMock[id], ...updateData };
		return [1, [UserArrayMock[id]]];
	}),
	destroy: jest.fn((options) => {
		const id = options.where.user_id;

		return {}
	}),
}

describe("User Operations: Create, Read, Update, Delete", () => {

	test('Should retrieve a user by ID successfully', async () => {
		const req = { params: { id: 2 } };
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const getUserWithMock = userController.getUser(UserMock);
		await getUserWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: { user: UserArrayMock[2] }
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json).toBeCalledWith(expectedResponse);
	});


	test('Should fail for nonexistent user', async () => {
		const req = { params: { id: 3 } }
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const expectedResponse = {
			status: "fail",
			data: { message: 'Resource not found' }
		};

		const getUserWithMock = userController.getUser(UserMock);
		await getUserWithMock(req, res);

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
		expect(res.json).toBeCalledWith(expectedResponse);
	});

	test('Should get all users successfully', async () => {
		const req = {};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const getAllUsersWithMock = userController.getAllUsers(UserMock);
		await getAllUsersWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: { users: UserArrayMock }
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json)
			.toHaveBeenCalledWith(expectedResponse);
	});

	test('Should create a user successfully', async () => {
		const req = {
			body: {
				"username": "Jon234",
				"password": "testing",
				"role": "admin"
			}
		};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const createUserWithMock = userController.createUser(UserMock);
		await createUserWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: {
				user: {
					user_id: expect.any(Number),
					password_hash: expect.any(String),
					username: expect.any(String),
					role: expect.any(String),
				}
			}
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
		expect(res.json)
			.toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
	});

	test('Should not create new user without username', async () => {
		const req = {
			body: {
				"password": "testing",
				"role": "admin"
			}
		};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const createUserWithMock = userController.createUser(UserMock);
		await createUserWithMock(req, res);

		const expectedResponse = {
			status: "fail",
			data: { message: 'Username cannot be null' }
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
		expect(res.json).toHaveBeenCalledWith(expectedResponse)
	});

	test('Should not create new user without password', async () => {
		const req = {
			body: {
				"username": "testuser",
				"role": "admin"
			}
		};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const createUserWithMock = userController.createUser(UserMock);
		await createUserWithMock(req, res);

		const expectedResponse = {
			status: "fail",
			data: { message: 'Password cannot be null' }
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
		expect(res.json).toHaveBeenCalledWith(expectedResponse)
	});

	test('Should not create new user without role', async () => {
		const req = {
			body: {
				"username": "testuser",
				"password": "testingpw"
			}
		};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const createUserWithMock = userController.createUser(UserMock);
		await createUserWithMock(req, res);

		const expectedResponse = {
			status: "fail",
			data: { message: 'Role cannot be null' }
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
		expect(res.json).toHaveBeenCalledWith(expectedResponse)
	});

	test('Should update user by ID successfully', async () => {
		const req = {
			body: {
				username: "Jon234",
				password: "testing",
				role: "admin"
			},
			params: {
				id: 2
			}
		};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const updateUserWithMock = userController.updateUserById(UserMock);
		await updateUserWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: {
				user: {
					user_id: expect.any(Number),
					password_hash: expect.any(String),
					username: expect.any(String),
					role: expect.any(String),
				}
			}
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json)
			.toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
	});

	test('Should deny user record delete without ID', async () => {
		const req = { params: {} };
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const deleteUserWithMock = userController.deleteUser(UserMock);
		await deleteUserWithMock(req, res);

		const expectedResponse = {
			status: "fail",
			data: { message: ERR_MESSAGES.INVALID_ID }
		};

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
		expect(res.json).toHaveBeenCalledWith(expectedResponse);
	});

	test('Should remove a user record by ID successfully', async () => {
		const req = {
			params: {
				id: 2
			}
		};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const deleteUserWithMock = userController.deleteUser(UserMock);
		await deleteUserWithMock(req, res);

		const expectedResponse = {
			status: "success",
			data: { message: 'User deleted successfully' }
		};

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(expectedResponse);
	});
});
