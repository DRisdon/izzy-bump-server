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
  models.Product.findAll({
    include: {
      model: Picture
    }
  }).then(products => {
    res.json(products);
  });
});

router.get('/id/:id', (req, res) => {
  models.Product.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Picture
    }
  }).then(product => {
    res.json(product)
  });
});

router.post('/', Auth.restrict, models.Picture.uploadImage, models.Product.createPicture, (req, res) => {
  models.Product.create({
    name: req.body.name,
    price: req.body.price,
    pictureId: res.locals.picture.id,
    stock: req.body.stock,
    isArtwork: req.body.isArtwork
  }).then(product => {
    res.json(product);
  }).catch(err =>
    res.json(err.errors[0])
  );
});

router.put('/id/:id', Auth.restrict, models.Picture.deleteUpload, models.Picture.uploadImage, models.Product.createPicture, (req, res) => {
  models.Picture.update({
    name: req.body.name,
    price: req.body.price,
    pictureId: res.locals.picture.id ? res.locals.picture.id : req.body.pictureId,
    stock: req.body.stock,
    isArtwork: req.body.isArtwork
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

router.delete('/id/:id', Auth.restrict, models.Product.getPictureId, models.Picture.deleteUpload, (req, res) => {
  models.Picture.destroy({
    where: {
      id: req.params.id
    },
    include: {
      model: Picture
    }
  }).then(result => {
    res.json({
      message: 'product and associated picture deleted'
    });
  })
});
