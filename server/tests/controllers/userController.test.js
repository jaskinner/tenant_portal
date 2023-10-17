const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../db');

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
		.send({ username: 'Jon', password: 'password', role: 'admin' });

	createdUserId = response.body.user.user_id;
	expect(response.statusCode).toBe(201);
	expect(response.body.user.username).toBe('Jon');
});

test('GET /users', async () => {
	const response = await request(app)
		.get('/users')
});

test('PUT /users', async () => {
	const response = await request(app)
		.put(`/users/${createdUserId}`)
		.send({ username: 'Test', password: 'newpass', role: 'tenant' });

	expect(response.statusCode).toBe(200);
	expect(response.body.user.username).toBe('Test');
	expect(response.body.user.role).toBe('tenant');
});

test('DELETE /users', async () => {
	const response = await request(app)
		.delete(`/users/${createdUserId}`);

	expect(response.statusCode).toBe(200);
	expect(response.body.user).toBeUndefined();
});
