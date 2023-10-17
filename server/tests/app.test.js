const app = require('../app');
const { sequelize } = require('../db');
const request = require('supertest');

beforeAll(async () => {
	console.log("Before all tests: Authenticating Sequelize...");
	await sequelize.authenticate();
	console.log("Successfully authenticated.");
});

afterAll(async () => {
	console.log("After all tests: Closing Sequelize...");
	await sequelize.close();
	console.log("Successfully closed.");
});

describe("Test the root path", () => {
	test("Should receive GET 200", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});
});
