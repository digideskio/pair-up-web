const conn = require('../conn');
const { Sequelize } = conn;

const UserOrganization = conn.define('user_organization', {});

module.exports = UserOrganization;
