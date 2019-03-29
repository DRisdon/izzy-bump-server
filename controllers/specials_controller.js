const router = require('express').Router();
const Special = require('../models/special');
const Auth = require('../services/auth');

router.get('/', (req, res) => {
  res.json({
    specials: 'none'
  })
})

module.exports = router;
