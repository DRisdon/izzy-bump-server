const router = require('express').Router();
const models = require('../db/models/index');
const Auth = require('../services/auth');

router.get('/', (req, res) => {
  models.Special.findAll().then( specials => {
    res.json(specials)
  })
})

module.exports = router;
