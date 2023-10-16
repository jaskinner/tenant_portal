const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tenant_portal', 'root', 'root', {
    host: 'db',
    dialect: 'mysql'
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, testConnection };