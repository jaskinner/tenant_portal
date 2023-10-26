const auth = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('./db/models/User');
const { handleError, HTTP_STATUS } = require('./utils/helpers');

auth.post('/', async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ where: { username } });

	if (!user) {
		return handleError({message: 'User not found'}, res, HTTP_STATUS.BAD_REQUEST);
	}

	const match = await bcrypt.compare(password, user.password_hash);

	if (!match) {
		return handleError({message: "Bad credentials"}, res, HTTP_STATUS.UNAUTHORIZED);
	}

	const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
	res.json({ token })
});

module.exports = auth;
