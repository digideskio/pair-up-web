const conn = require('../conn');
const { Sequelize } = conn;
const jwt = require('jwt-simple');

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  userStatus: {
    type: Sequelize.STRING,
    // allowNull: false
  }
}, {
  timestamps: false,
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

User.authenticate = function(credentials) {
  const { email, password } = credentials;
  return this.findOne({
    where: { email, password }
  })
    .then(user => {
      if(user) return jwt.encode({ id: user.id }, process.env.JWT_KEY);
      throw { status: 401 };
    })
    .catch(err => {
      throw err;
    });
};

User.exchangeTokenForUser = function(token) {
  try {
    const id = jwt.decode(token, process.env.JWT_KEY).id;
    return User.find({
      where: { id }
    })
      .then(user => {
        if(user) return user;
        throw { status: 401 };
      });
  }
  catch(err) {
    return Promise.reject({ status: 401 });
  }
};

module.exports = User;
