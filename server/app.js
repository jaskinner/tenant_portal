const express = require('express');
const morgan = require('morgan');
const userController = require('./controllers/userController')
const { sequelize } = require('./db');
const app = express();
const port = 3000;

app.use(express.json())
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Home'));

app.get('/users', (req, res) => {
	userController(req, res);
});

sequelize.sync({ force: false })
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	})
	.catch(err => {
		console.error(`Server was not able to connect to the database: ${err}`)
	})
