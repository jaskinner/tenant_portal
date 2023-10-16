const request = require('supertest');
const myApp = require('../app');  // Replace with your app's path

describe('GET /', () => {
	it('responds with 200', async () => {
		const response = await request(myApp).get('/');
		expect(response.statusCode).toBe(200);
	});
});
