const router = require('express').Router();
module.exports = router;
const { io } = require('../sockets');

const { Description } = require('../db').models;

router.get('/', (req, res, next) => {
  Description.findAll()
    .then(descriptions => res.send(descriptions))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Description.create(req.body)
    .then(description => {
      io.emit('createdDescription', description)
      res.send(description)
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Description.findById(req.params.id)
    .then(description => {
      Object.assign(description, req.body);
      return description.save();
    })
    .then(description => {
      io.emit('updatedDescription', description)
      res.send(description)
    })
    .catch(next);
});
