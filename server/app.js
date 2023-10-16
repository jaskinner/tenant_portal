const express = require('express');
const { sequelize } = require('./db');
const port = 3000;

const app = express();

sequelize.sync({ force: false })
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	})
	.catch(err => {
		console.error(`Server was not able to connect to the database: ${err}`)
	});
