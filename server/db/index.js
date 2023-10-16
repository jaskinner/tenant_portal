const sequelize = require('./sequelize');
const UserModel = require('./models/User')

const User = UserModel();

module.exports = { sequelize, User };
