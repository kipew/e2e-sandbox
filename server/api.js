const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/data', function(req, res) {
  res.send('data home page');
});

router.get('/about', function(req, res) {
  res.send('About data');
});

module.exports = router;
