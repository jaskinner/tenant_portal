const auth = require('express').Router();
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const bcrypt = require('bcrypt')

const User = require('./db/models/User')

auth.post('/', async (req, res) => {
	const { username, password_hash } = req.body;

	const user = await User.findOne({ where: { username } });

	if (!user) {
		console.log("user not found");
	}

	const match = await bcrypt.compare(password_hash, user.password_hash);

	if (!match) {
		console.log("bad password")
	}

	const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
	res.json({ token })
});

module.exports = auth;
