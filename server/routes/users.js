const router = require('express').Router();
module.exports = router;

const { User } = require('../db').models;
const { mobileSockets } = require('../sockets');

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => {
      res.send(users)
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findAllNotBlocked(id)
    .then(users => {
      users.forEach(user => console.log('user:', user.fullName));
      console.log('ROUTE USERS LENGTH', users.length);
      res.send(users);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then(user => {
      const socket = mobileSockets[user.id];
      if(socket) {
        socket.broadcast.emit('updatedUser', user);
      }
      res.send(user);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
