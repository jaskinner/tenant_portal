const request = require('supertest');
const app = require('../../app');
const db = require('../../db/db');

const userPath = '/api/users';

beforeAll(async () => {
	await db.sync({ force: true });
});

afterAll(async () => {
	await db.close()
});

describe("User Operations: Create, Read, Update, Delete", () => {
	let createdUserId;

	beforeEach(async () => {
		const response = await request(app)
			.post(userPath)
			.send({ username: 'testuser', password: 'password', role: 'admin' });

		createdUserId = response.body.user.user_id;
	});

	afterEach(async () => {
		await request(app).delete(`${userPath}/${createdUserId}`);
	});

	test('Should retrieve a user by ID successfully', async () => {
		const response = await request(app)
			.get(`${userPath}/${createdUserId}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.user.username).toBe('testuser');
	});

	test('Should get all users successfully', async () => {
		const response = await request(app)
			.get(userPath);

		expect(response.statusCode).toBe(200);
		expect(response.body.users).toBeDefined();
	});

	test('Should create a user successfully', async () => {
		const response = await request(app)
			.post(userPath)
			.send({ username: 'newuser', password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(201);
		expect(response.body.user.username).toBe('newuser');
	});

	test('Should update user username by ID successfully', async () => {
		const response = await request(app)
			.put(`${userPath}/${createdUserId}`)
			.send({ username: "putuser" });

		expect(response.statusCode).toBe(200);
		expect(response.body.user.username).toBe("putuser");
		expect(response.body.user.user_id).toBe(createdUserId);
	});

	test('Should update user password by ID successfully', async () => {
		const response = await request(app)
			.put(`${userPath}/${createdUserId}`)
			.send({ password: "newpass" });

		expect(response.statusCode).toBe(200);
		expect(response.body.user.user_id).toBe(createdUserId);
	});

	test('Should update user role by ID successfully', async () => {
		const response = await request(app)
			.put(`${userPath}/${createdUserId}`)
			.send({ role: "tenant" });

		expect(response.statusCode).toBe(200);
		expect(response.body.user.role).toBe("tenant");
		expect(response.body.user.user_id).toBe(createdUserId);
	});

	test('Should remove a user record by ID successfully', async () => {
		const response = await request(app)
			.delete(`${userPath}/${createdUserId}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.user).toBeUndefined();
	});
});

describe("User Input Validations and Edge Cases", () => {
	test('Should return 404 for a nonexistent ID', async () => {
		const response = await request(app)
			.get(`${userPath}/100`);

		expect(response.statusCode).toBe(404);
		expect(response.body.user).toBeUndefined();
	});

	test('Should reject malformed username update', async () => {
		const response = await request(app)
			.post(userPath)
			.send({ username: "1234_abc**", password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(400);
		expect(response.body.user).toBeUndefined();
	});

	test('Should reject empty username update', async () => {
		const response = await request(app)
			.post(userPath)
			.send({ username: "", password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(400);
		expect(response.body.user).toBeUndefined();
	});

	test('Should reject missing username user creation', async () => {
		const response = await request(app)
			.post(userPath)
			.send({ password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(400);
		expect(response.body.user).toBeUndefined();
	});
});
