const request = require('supertest');
const app = require('../../app');
const db = require('../../db/db');

beforeAll(async () => {
	await db.sync({ force: true });
});

afterAll(async () => {
	await db.close()
});

describe("USER CRUD", () => {
	let createdUserId;

	beforeEach(async () => {
		const response = await request(app)
			.post('/users')
			.send({ username: 'testuser', password: 'password', role: 'admin' });

		createdUserId = response.body.user.user_id;
	});

	afterEach(async () => {
		await request(app).delete(`/users/${createdUserId}`);
	});

	test('GET /users with id OK', async () => {
		const response = await request(app)
			.get(`/users/${createdUserId}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.user.username).toBe('testuser');
	});

	test('GET /users nonexistent id 404', async () => {
		const nonExistentUserId = createdUserId + 1;
		const response = await request(app)
			.get(`/users/${nonExistentUserId}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.user).toBeUndefined();
	});

	test('PUT /users username with id OK', async () => {
		const response = await request(app)
			.put(`/users/${createdUserId}`)
			.send({ username: "putuser" });

		expect(response.statusCode).toBe(200);
		expect(response.body.user.username).toBe("putuser");
		expect(response.body.user.user_id).toBe(createdUserId);
	});

	test('PUT /users password with id OK', async () => {
		const response = await request(app)
			.put(`/users/${createdUserId}`)
			.send({ password: "newpass" });

		expect(response.statusCode).toBe(200);
		expect(response.body.user.user_id).toBe(createdUserId);
	});

	test('PUT /users role with id OK', async () => {
		const response = await request(app)
			.put(`/users/${createdUserId}`)
			.send({ role: "tenant" });

		expect(response.statusCode).toBe(200);
		expect(response.body.user.role).toBe("tenant");
		expect(response.body.user.user_id).toBe(createdUserId);
	});

	test('DELETE /users with id OK', async () => {
		const response = await request(app)
			.delete(`/users/${createdUserId}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.user).toBeUndefined();
	});
});

describe("USER validation", () => {
	test('POST /users OK', async () => {
		const response = await request(app)
			.post('/users')
			.send({ username: 'testuser', password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(201);
		expect(response.body.user.username).toBe('testuser');
	});

	test('POST /users malformed username', async () => {
		const response = await request(app)
			.post('/users')
			.send({ username: "1234_abc**", password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(400);
		expect(response.body.user).toBeUndefined();
	});

	test('POST /users empty username', async () => {
		const response = await request(app)
			.post('/users')
			.send({ username: "", password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(400);
		expect(response.body.user).toBeUndefined();
	});

	test('POST /users missing username', async () => {
		const response = await request(app)
			.post('/users')
			.send({ password: 'password', role: 'admin' });

		expect(response.statusCode).toBe(400);
		expect(response.body.user).toBeUndefined();
	});
});
