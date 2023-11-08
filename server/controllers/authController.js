const { handleError, HTTP_STATUS } = require('../utils/helpers');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (User) => async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ where: { username } });

		if (!user) {
			return handleError({ message: 'User not found' }, res, HTTP_STATUS.BAD_REQUEST);
		}

		const match = await bcrypt.compare(password, user.password_hash);

		if (!match) {
			return handleError({ message: "Bad credentials" }, res, HTTP_STATUS.UNAUTHORIZED);
		}

		const token = jwt.sign(
			{ user_id: user.user_id, username: user.username, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' });

		res.json({
			token: token,
			user: {
				id: user.user_id,
				username: user.username,
				role: user.role
			}
		})
	} catch (error) {
		handleError(error, res);
	}
}

exports.authVerify = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) {
		return res.sendStatus(401);
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}

		req.user = user;

		next();
	});
}
