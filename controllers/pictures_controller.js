const router = require('express').Router();
const models = require('../db/models/index');
const Auth = require('../services/auth');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

router.get('/', (req, res) => {
  models.Picture.findAll().then(pictures => {
    res.json(pictures);
  });
});

router.get('/artwork', (req, res) => {
  models.Picture.findAll({
    where: {
      pictureType: 'artwork'
    }
  }).then(pictures => {
    res.json(pictures);
  });
});

router.get('/tattoos', (req, res) => {
  models.Picture.findAll({
    where: {
      pictureType: 'tattoo'
    }
  }).then(pictures => {
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
  cloudinary.uploader.upload(req.body.url).then((image) => {
    models.Picture.create({
      name: req.body.name,
      description: req.body.description,
      url: image.secure_url,
      pictureType: req.body.pictureType
    }).then(picture => {
      res.json(picture);
    }).catch(err =>
      res.json(err.errors[0])
    );
  });
});

router.put('/:id', Auth.restrict, (req, res) => {
  models.Picture.update({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    pictureType: req.body.pictureType
  }, {
    where: {
      id: req.params.id
    },
    returning: true
  }).then(err, picture => {
    res.json(picture[1][0]);
  }).catch(err =>
    res.json(err.errors[0])
  );
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
