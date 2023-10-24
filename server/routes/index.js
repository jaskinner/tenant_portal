const express = require('express');
const userRoutes = require('./userRoutes');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const bcrypt = require('bcrypt')

const User = require('../db/models/User')
const { hashPassword } = require('../utils/helpers');

router.post('/login', async (req, res) => {
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

router.use('/', expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));

router.use('/users', userRoutes);

module.exports = router;
