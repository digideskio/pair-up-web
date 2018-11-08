const Sequelize = require('sequelize');
const localDb = 'postgres://localhost/capstone_db';
const database = process.env.DATABASE_URL || localDb;

const conn = new Sequelize(database, { logging: false });

module.exports = conn;
