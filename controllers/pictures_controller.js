const router = require('express').Router();
const Picture = require('../models/picture');
const Auth = require('../services/auth');

router.get('/', (req, res) => {
  res.json({
    pictures: 'none'
  })
})

module.exports = router;
