const router = require('express').Router();
module.exports = router;

const { UserRequest } = require('../db').models;
const { io, webAppSockets, mobileSockets } = require('../sockets');

router.get('/', (req, res, next) => {
  UserRequest.findAll()
    .then(userRequests => res.send(userRequests))
    .catch(next);
});

router.post('/', (req, res, next) => {
  UserRequest.create(req.body)
    .then(userRequest => {
      const socketId = mobileSockets[userRequest.responderId].id;
      io.to(socketId).emit('newUserRequest', userRequest);
      res.send(userRequest);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  UserRequest.findById(req.params.id)
    .then(userRequest => {
      Object.assign(userRequest, req.body)
      return userRequest.save()
    })
    .then(userRequest => {
      const socketId = mobileSockets[userRequest.requesterId].id;
      io.to(socketId).emit('updatedUserRequest', userRequest)
      res.send(userRequest)
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  UserRequest.findById(req.params.id)
    .then(userRequest => {
      const requesterId = mobileSockets[userRequest.requesterId].id;
      // const organizationId = webAppSockets[userRequest.organizationId].id;
      io.to(requesterId).emit('deletedUserRequest', userRequest.id);
      // io.to(organizationId).emit('deletedUserRequest', userRequest.id);
      userRequest.destroy();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
})
