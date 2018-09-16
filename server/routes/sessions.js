const router = require('express').Router();
const { User } = require('../db').models;
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

//ATTEMPT LOGIN - /api/sessions
router.post('/', (req, res, next) => {
  User.authenticate(req.body)
    .then(token => res.send(token))
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      if(req.body.token) {
        stripe.charges.create({
          amount: 9999,
          currency: 'usd',
          description: 'Pair Up Subscription Charge',
          source: req.body.token.id
        })
      }
      return User.authenticate({ email: req.body.email, password: req.body.password })
    })
    .then(token => res.send(token))
    .catch(next);
});

router.get('/:token', (req, res, next) => {
  User.exchangeTokenForUser(req.params.token)
    .then(user => res.send(user))
    .catch(next);
});

router.post('/:userId/organizations/:organizationId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update({
        organizationId: req.params.organizationId
      }))
    .then(user => res.send(user))
    .catch(next)
})

module.exports = router;
