const router = require('express').Router();
module.exports = router;

// const googleSecret = process.env.AIzaSyDjSkTUgRVsJRVCGrera_Yp09pR3qhnCPs;

const gMC = require('@google/maps').createClient({
    key: "AIzaSyDjSkTUgRVsJRVCGrera_Yp09pR3qhnCPs",
    Promise: Promise
});

router.post('/getpredictions', (req, res, next) => {
    gMC.placesAutoComplete({ input: req.body.input }).asPromise()
    .then(resp => resp.json.predictions)
    .then(predictions => res.send(predictions));
});

router.post('/getplace', (req, res, next) => {
    gMC.reverseGeocode({ place_id: req.body.query }).asPromise()
    .then( resp => res.send(resp.json.results))
    .catch(next)
});




