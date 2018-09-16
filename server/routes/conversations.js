const router = require('express').Router();
module.exports = router;

const { Message, Conversation } = require('../db').models;
const { io, mobileSockets } = require('../sockets');
const conn = require('../db')
const Op= require('sequelize').Op;

router.get('/:user1Id/:user2Id', (req, res, next) => {
  Conversation.findOrCreateConversation(req.params.user1Id, req.params.user2Id)
    .then(conversation => {
      const messages = conversation.messages;
      res.send(messages);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  const text = req.body.text;
  const user1 = req.body.user1;
  const user2 = req.body.user2;
  Message.createMessage(text, user1, user2)
    .then(() => Conversation.findOrCreateConversation(user1.id, user2.id))
    .then(conversation => {
      const messages = conversation.messages;
      if(mobileSockets[user2.id]) {
        const socketId = mobileSockets[user2.id].id;
        io.to(socketId).emit('newMessage', messages);
      }
      res.send(messages);
    })
    .catch(next);
})
