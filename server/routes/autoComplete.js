const router = require('express').Router();
module.exports = router;

const gMC = require('@google/maps').createClient({
  key: process.env.GOOGLE_SECRET,
  Promise: Promise
});

router.post('/getpredictions', (req, res, next) => {
  gMC.placesAutoComplete({ input: req.body.input }).asPromise()
    .then(resp => resp.json.predictions)
    .then(predictions => res.send(predictions));
});

router.post('/getplace', (req, res, next) => {
  gMC.reverseGeocode({ place_id: req.body.query }).asPromise()
    .then(resp => res.send(resp.json.results))
    .catch(next)
});




