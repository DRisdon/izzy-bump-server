const router = require('express').Router();
const models = require('../db/models/index');
const Auth = require('../services/auth');

router.get('/', (req, res) => {
  models.Picture.findAll().then( pictures => {
    res.json(pictures)
  })
})

module.exports = router;
