const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../db/sequelize');

let createdUserId;

beforeAll(async () => {
	sequelize.sync({ force: true });
});

afterAll(async () => {
	await sequelize.close()
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

test('GET /user does not exist', async () => {
	const idDoesNotExist = createdUserId + 1;
	const response = await request(app)
		.get('/users/');

	expect(response.statusCode).toBe(404);
	expect(response.body.user).toBeUndefined();
});

test('GET /users', async () => {
	const response = await request(app)
		.get(`/users/${createdUserId}`);

	expect(response.statusCode).toBe(200);
	expect(response.body.user.username).toBe('testuser');
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
