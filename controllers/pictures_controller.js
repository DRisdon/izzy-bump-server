const router = require('express').Router();
const models = require('../db/models/index');
const Auth = require('../services/auth');

router.get('/', (req, res) => {
  models.Picture.findAll().then(pictures => {
    res.json(pictures);
  });
});

router.get('/:id', (req, res) => {
  models.Picture.findOne({
    where: {
      id: req.params.id
    }
  }).then(picture => {
    res.json(picture)
  });
});

router.post('/', Auth.restrict, (req, res) => {
  models.Picture.create({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  }).then(picture => {
    res.json(picture);
  });
});

router.put('/:id', Auth.restrict, (req, res) => {
  models.Picture.update({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  }, {
    where: {
      id: req.params.id
    },
    returning: true
  }).then(picture => {
    res.json(picture[1][0]);
  });
});

router.delete('/:id', Auth.restrict, (req, res) => {
  models.Picture.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json({
      message: 'picture deleted'
    });
  });
});

module.exports = router;
