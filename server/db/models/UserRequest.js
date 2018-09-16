const conn = require('../conn');
const { Sequelize } = conn;

const UserRequest = conn.define('user_request', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  }
}, {
  timestamps: false
});

module.exports = UserRequest;
