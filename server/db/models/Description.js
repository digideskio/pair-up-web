const conn = require('../conn');
const { Sequelize } = conn;

const Description = conn.define('description', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
});

module.exports = Description;
