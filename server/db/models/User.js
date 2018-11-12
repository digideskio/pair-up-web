const conn = require('../conn');
const { Sequelize } = conn;
const { Op } = Sequelize;
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

User.findAllNotBlocked = async function(userId) {
  try {
    console.log('USER ID TO BLOCK', userId);
    // let toReturn;
    const allBlocks = await conn.models.block.findAll({
      where: { blockeeId: userId }
    });
    // console.log('BLOCKED COUNT FROM MODEL', allBlocks.length);
    // console.log('single blocked id:', allBlocks[0].blockerId)
    const blockMap = allBlocks.map(block => block.blockerId);
    // console.log('BLOCK MAP:', blockMap)
    // const ownBlocks = allBlocks.filter(blocked => blocked.blockeeId === userId);
    // console.log('BLOCKED COUNT FILTERED FROM MODEL', ownBlocks.length); // this is the problem
    // const blockedIds = allBlocks.map(blocked => blocked.blockerId);
    const allUsers = await User.findAll({
    //   // include: [{ model: conn.models.block }],
    //   where: {
    //     id: {
    //       $ne: allBlocks[0].blockerId
    //     }
    //   }
    });
    // const unblockedUsers = allUsers.filter(user => !blockedIds.includes(user.id));
    // console.log('ALL USERS', allUsers.length);
    const filteredUsers = allUsers.filter(user => {
      return blockMap.indexOf(user.id) === -1;
    });

    const requests = await conn.models.user_request.findAll();

    // console.log('pre-req')

    requests
      .reduce((memo, req) => {
        if(req.requesterId === userId) {
          memo.push(req.responderId);
        }
        if(req.responderId === userId) {
          memo.push(req.requesterId);
        }
        return memo;
      }, []) // gives an array with just the other user on requests
      .forEach(async(id) => {
        // console.log('pre-if check', blockMap.indexOf(id) === -1);
        if(blockMap.indexOf(id) !== -1) { // this if is not getting hit
          const request = await conn.models.user_request.findOne({
            where: [
              { 
                requesterId: { [Op.or]: [id, userId] }
              },
              { 
                responderId: { [Op.or]: [userId, id] }
              },
            ]
          })
          // console.log('REQUEST..', request);
          request.destroy();
        }
        // console.log('test inside for each')
      })


    // console.log('FILTERED USERS', filteredUsers.length);
    // console.log('USERS NOT BLOCKED', unblockedUsers.length);
    console.log('-------------------');
    return filteredUsers;
  } catch(err) {
    console.log('CATCH ERROR:', err);
  }

}

// User.findAllNotBlocked = function(userId) {
//   let toReturn;
//   conn.models.block.findAll()
//     .then(allblocked => {
//       console.log('ALL BLOCKS', allblocked);
//       return allblocked.filter(blocked => blocked.blockeeId === userId)
//     })
//     .then(userblocked => {
 
//       const blockedIds = userblocked.map(blocked => blocked.blockerId);
//       console.log('BLOCKED', blockedIds)
//       User.findAll()
//         .then(users => {
//           _users = users.filter(user => !blockedIds.includes(user.id));

//           console.log('ALL USERS', users.length);
//           console.log('USERS NOT BLOCKED', _users.length);
//           // console.log('USERS NOT BLOCKED', _users); // this works, i get all users back except for the blocked one.
//           return _users;
//         })
//         .then(unblocked => {
//           console.log(unblocked.length);
//           toReturn = unblocked;
//         });

        
//         // i'm losing the data here, i have to hold onto it to pass it along

//         console.log('USERS OUTSIDE', toReturn);

//         // console.log(_users.forEach(user => console.log(user.fullName)))
//         // return _users;
//     })
// }

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
