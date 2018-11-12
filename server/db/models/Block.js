const conn = require('../conn');
const { Sequelize } = conn;

const Block = conn.define('block', {});

module.exports = Block;