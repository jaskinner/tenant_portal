const userController = require('../../controllers/userController');
const { HTTP_STATUS } = require('../../utils/constants');

UserArrayMock = [
	{ user_id: 1, username: 'owneruser', password_hash: 'password', role: 'owner' },
	{ user_id: 2, username: 'manageruser', password_hash: 'password', role: 'manager' },
	{ user_id: 3, username: 'tenantuser', password_hash: 'password', role: 'tenant' }
];

const UserMock = {
	findAll: jest.fn().mockReturnValue(UserArrayMock),
	findByPk: jest.fn().mockReturnValue(UserArrayMock[2]),
	// findOne: jest.fn((options) => {
	// 	let id = options.where.user_id;
	// 	return UserArrayMock[id];
	// }),
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
	delete: jest.fn(() => {
		
	}),
}

describe("User Operations: Create, Read, Update, Delete", () => {

	test('Should retrieve a user by ID successfully', async () => {
		const req = { params: { id: 3 } };
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		}

		const getUserWithMock = userController.getUser(UserMock);
		await getUserWithMock(req, res);

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json).toBeCalledWith({ user: UserArrayMock[2] });
	});

	test('Should get all users successfully', async () => {
		const req = {};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const getAllUsersWithMock = userController.getAllUsers(UserMock);
		await getAllUsersWithMock(req, res);

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json)
			.toHaveBeenCalledWith({ users: UserArrayMock });
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

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
		expect(res.json)
			.toHaveBeenCalledWith(expect.objectContaining({
				user: {
					user_id: expect.any(Number),
					password_hash: expect.any(String),
					username: expect.any(String),
					role: expect.any(String),
				}
			}));
	});

	test('Should update user by ID successfully', async () => {
		const req = {
			body: {
				username: "Jon234",
				password: "testing",
				role: "admin"
			},
			params: {
				id: 3
			}
		};
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res)
		};

		const updateUserWithMock = userController.updateUserById(UserMock);
		await updateUserWithMock(req, res);

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
		expect(res.json)
			.toHaveBeenCalledWith(expect.objectContaining({
				user: {
					user_id: expect.any(Number),
					password_hash: expect.any(String),
					username: expect.any(String),
					role: expect.any(String),
				}
			}));
	});

	test('Should deny user record delete without ID', async () => {
		const deleteUserWithMock = userController.deleteUser(UserMock);
		await deleteUserWithMock(req, res);

		expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
	});

	test('Should remove a user record by ID successfully', async () => {
		expect(response.statusCode).toBe(200);
		expect(response.body.user).toBeUndefined();
	});
});

// describe("User Input Validations and Edge Cases", () => {
// 	test('Should return 404 for a nonexistent ID', async () => {
// 		const response = await request(app)
// 			.get(`${userPath}/100`);

// 		expect(response.statusCode).toBe(404);
// 		expect(response.body.user).toBeUndefined();
// 	});

// 	test('Should reject malformed username update', async () => {
// 		const response = await request(app)
// 			.post(userPath)
// 			.send({ username: "1234_abc**", password: 'password', role: 'admin' });

// 		expect(response.statusCode).toBe(400);
// 		expect(response.body.user).toBeUndefined();
// 	});

// 	test('Should reject empty username update', async () => {
// 		const response = await request(app)
// 			.post(userPath)
// 			.send({ username: "", password: 'password', role: 'admin' });

// 		expect(response.statusCode).toBe(400);
// 		expect(response.body.user).toBeUndefined();
// 	});

// 	test('Should reject missing username user creation', async () => {
// 		const response = await request(app)
// 			.post(userPath)
// 			.send({ password: 'password', role: 'admin' });

// 		expect(response.statusCode).toBe(400);
// 		expect(response.body.user).toBeUndefined();
// 	});
// });
