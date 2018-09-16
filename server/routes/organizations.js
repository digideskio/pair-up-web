const router = require('express').Router();
module.exports = router;

const { Organization } = require('../db').models;

router.get('/', (req, res, next) => {
  Organization.findAll()
    .then(organizations => res.send(organizations))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Organization.create(req.body)
    .then(organization => res.send(organization))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Organization.findById(req.params.id)
    .then(organization => {
      Object.assign(organization, req.body)
      return organization.save()
    })
    .then(organization => res.send(organization))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Organization.findById(req.params.id)
    .then(organization => organization.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
