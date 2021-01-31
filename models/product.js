'use strict';
const cloudinary = require('cloudinary');
const models = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    pictureId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    isArtwork: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    Product.hasOne(Picture)
  };

  Product.createPicture = (req, res, next) => {
    models.Picture.create({
      cloudinaryId: res.locals.uploadedImage.public_id,
      name: req.body.name ? req.body.name : req.files.image.name,
      description: req.body.description,
      url: res.locals.uploadedImage.secure_url,
      thumbnail: `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/q_10/${res.locals.uploadedImage.public_id}.jpg`,
      pictureType: req.body.pictureType
    }).then((picture) => {
      res.locals.picture = picture;
      next();
    });
  }

  Product.getPictureId = (req, res, next) => {
    Product.findOne({
      where: {
        id: req.params.id
      }
    }).then(product => {
      if (product) {
        res.locals.pictureId = product.pictureId
      }
    })
  }

  return Product;
};
