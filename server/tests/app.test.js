const request = require('supertest');
const app = require('../app');

describe("Test the root path", () => {
	test("There should be GET ", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});
});
