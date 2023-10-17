const request = require('supertest');
const app = require('../../app');
const { db } = require('../../db');

// init user_id for suite-wide testing and increment one for user that doesn't exist
let createdUserId;
let nonExistentUserId = createdUserId + 1;

beforeAll(async () => {
	db.sync({ force: true });
});

afterAll(async () => {
	await db.close()
});

test('POST /users', async () => {
	const response = await request(app)
		.post('/users')
		.send({ username: 'testuser', password: 'password', role: 'admin' });

	createdUserId = response.body.user.user_id;
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

test('GET /users', async () => {
	const response = await request(app)
		.get(`/users/${createdUserId}`);

	expect(response.statusCode).toBe(200);
	expect(response.body.user.username).toBe('testuser');
});

test('GET /users', async () => {
	const response = await request(app)
		.get(`/users/${nonExistentUserId}`);

	expect(response.statusCode).toBe(404);
	expect(response.body.user).toBeUndefined();
});

test('PUT /users', async () => {
	const response = await request(app)
		.put(`/users/${createdUserId}`)
		.send({ username: 'tenantuser', password: 'newpass', role: 'tenant' });

	expect(response.statusCode).toBe(200);
	expect(response.body.user.username).toBe('tenantuser');
	expect(response.body.user.role).toBe('tenant');
});

test('DELETE /users', async () => {
	const response = await request(app)
		.delete(`/users/${createdUserId}`);

	expect(response.statusCode).toBe(200);
	expect(response.body.user).toBeUndefined();
});
