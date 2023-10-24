const app = require('./app');
const db = require('./db/db')
const port = 3000;

db.sync({ force: true })
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	})
	.catch(err => {
		console.error(`Server was not able to connect to the database: ${err}`)
	})
