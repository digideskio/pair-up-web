const conn = require('../conn');
const { Sequelize } = conn;

const Organization = conn.define('organization', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  organization_type: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  contact_name: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  contact_phone: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  image: {
    type: Sequelize.TEXT
  },
  avatar: {
    type: Sequelize.TEXT
  },
  backgroundColor: {
    type: Sequelize.TEXT,
    defaultValue: '#fff'
  },
  textColor: {
    type: Sequelize.TEXT,
    defaultValue: '#000000'
  },
  latitude: {
    type: Sequelize.DECIMAL
  },
  longitude: {
    type: Sequelize.DECIMAL
  },
}, {
  timestamps: false
});

module.exports = Organization;
