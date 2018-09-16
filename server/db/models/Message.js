const conn = require('../conn');
const { Sequelize } = conn;
const Op = Sequelize.Op;

const Message = conn.define('message', {
  text: Sequelize.STRING,
  user: Sequelize.JSON,
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
});

Message.createMessage = function(text, user1, user2) {
  const firstPermutation = `${user1.id}&${user2.id}`;
  const secondPermutation = `${user2.id}&${user1.id}`;
  return Message.create({
    text,
    user: {
      "_id": user1.id,
      "name": user1.fullName
    }
  })
    .then(message => Promise.all([
      conn.models.conversation.find({
        where: {
          id: {
            [Op.or]: [firstPermutation, secondPermutation]
          }
        }
      }), message
    ]))
    .then(([ conversation, message ]) => message.setConversation(conversation))
}

module.exports = Message;
