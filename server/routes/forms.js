const router = require('express').Router();
module.exports = router;

const { Form } = require('../db').models;

router.get('/', (req, res, next) => {
  Form.findAll()
    .then(forms => res.send(forms))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Form.create(req.body)
    .then(form => res.send(form))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Form.findById(req.params.id)
    .then(form => form.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});