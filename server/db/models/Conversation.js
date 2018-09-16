const conn = require('../conn');
const { Sequelize } = conn;
const Op = Sequelize.Op;

const Conversation = conn.define('conversation', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

Conversation.findOrCreateConversation = (user1Id, user2Id) => {
  const firstPermutation = `${user1Id}&${user2Id}`;
  const secondPermutation = `${user2Id}&${user1Id}`;
  return Conversation.find({
    where: {
      id: {
        [Op.or]: [firstPermutation, secondPermutation]
      }
    },
    include: [{ model: conn.models.message}],
    order: [[ conn.models.message, 'createdAt', 'DESC' ]]
  })
    .then(conversation => {
      if(conversation) {
        return conversation;
      } else {
        return Conversation.create({
          id: firstPermutation
        })
          .then(() => Conversation.findById(firstPermutation, {
              include: [{ model: conn.models.message }],
              order: [[ conn.models.message, 'createdAt', 'DESC' ]]
            }))
              .then(conversation => conversation);
      }
    })
}

module.exports = Conversation;

