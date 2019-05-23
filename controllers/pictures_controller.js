const router = require('express').Router();
const models = require('../models/index');
const Auth = require('../services/auth');
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
      pictureType: 'artwork',
      featured: false
    },
    order: [
      ['createdAt', 'DESC'],
    ]
  }).then(pictures => {
    res.json(pictures);
  });
});

router.get('/artwork/featured', (req, res) => {
  models.Picture.findAll({
    where: {
      pictureType: 'artwork',
      featured: true
    },
    order: [
      ['createdAt', 'DESC'],
    ]
  }).then(pictures => {
    res.json(pictures);
  });
});

router.get('/tattoos', (req, res) => {
  models.Picture.findAll({
    where: {
      pictureType: 'tattoo',
      featured: false
    },
    order: [
      ['createdAt', 'DESC']
    ],
  }).then(pictures => {
    res.json(pictures);
  });
});

router.get('/tattoos/featured', (req, res) => {
  models.Picture.findAll({
    where: {
      pictureType: 'tattoo',
      featured: true
    },
    order: [
      ['createdAt', 'DESC']
    ],
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

router.post('/', Auth.restrict, models.Picture.uploadImage, (req, res) => {
  models.Picture.create({
    cloudinaryId: res.locals.uploadedImage.public_id,
    name: req.body.name ? req.body.name : req.files.image.name,
    description: req.body.description,
    url: res.locals.uploadedImage.secure_url,
    thumbnail: `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/q_10/${res.locals.uploadedImage.public_id}.jpg`,
    pictureType: req.body.pictureType
  }).then(picture => {
    res.json(picture);
  }).catch(err =>
    res.json(err.errors[0])
  );
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

router.delete('/id/:id', Auth.restrict, models.Picture.deleteUpload, (req, res) => {
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
