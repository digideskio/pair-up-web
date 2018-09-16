const router = require('express').Router();
module.exports = router;

const { io, mobileSockets } = require('../sockets');

const { UserOrganization } = require('../db').models;

router.get('/', (req, res, next) => {
  UserOrganization.findAll()
    .then(userOrganizations => res.send(userOrganizations))
    .catch(next);
});

router.post('/', (req, res, next) => {
  UserOrganization.create(req.body)
    .then(userOrganization => {
      if(mobileSockets[userOrganization.userId]) {
        const socketId = mobileSockets[userOrganization.userId].id;
        io.to(socketId).emit('addUserOrganization', userOrganization)
      }
      res.send(userOrganization)
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  UserOrganization.findById(req.params.id)
    .then(userOrganization => userOrganization.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
