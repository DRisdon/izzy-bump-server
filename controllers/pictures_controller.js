const router = require('express').Router();
const models = require('../models/index');
const Auth = require('../services/auth');
const cloudinary = require('cloudinary');
const formData = require('express-form-data')

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


router.get('/id/:id', (req, res) => {
  models.Picture.findOne({
    where: {
      id: req.params.id
    }
  }).then(picture => {
    res.json(picture)
  });
});

router.post('/', Auth.restrict, (req, res) => {
  const imageUrl = req.files ? req.files.image.path : req.body.url
  const name = req.body.name ? req.body.name :
  cloudinary.uploader.upload(imageUrl).then((image) => {
    models.Picture.create({
      name: req.body.name ? req.body.name : req.files.image.name,
      description: req.body.description,
      url: image.secure_url,
      thumbnail: `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/q_10/${image.public_id}.jpg`,
      pictureType: req.body.pictureType
    }).then(picture => {
      res.json(picture);
    }).catch(err =>
      res.json(err.errors[0])
    );
  });
});

router.put('/id/:id', Auth.restrict, (req, res) => {
  models.Picture.update({
    name: req.body.name,
    description: req.body.description,
    pictureType: req.body.pictureType,
  }, {
    where: {
      id: req.params.id
    },
    returning: true
  }).then(picture => {
    res.json(picture[1][0]);
  }).catch(err =>
    res.json(err.errors[0])
  );
});

router.delete('/id/:id', Auth.restrict, (req, res) => {
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
