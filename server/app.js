const express = require('express');
const logger = require('./middleware/logger');
const { sequelize } = require('./db');
const app = express();
const port = 3000;

app.use(express.json())
app.use(logger);

app.get('/', )

sequelize.sync({ force: false })
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	})
	.catch(err => {
		console.error(`Server was not able to connect to the database: ${err}`)
	})
