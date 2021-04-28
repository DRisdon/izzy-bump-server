'use strict';
const models = require('../models/index');
const cloudinary = require('cloudinary');

module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    pictureType: {
      type: DataTypes.STRING,
      validate: {
        isIn: [
          ['artwork', 'tattoo', 'design']
        ]
      }
    },
    thumbnail: DataTypes.STRING,
    cloudinaryId: DataTypes.STRING,
    featured: DataTypes.BOOLEAN
  }, {});
  Picture.associate = function(models) {
    Picture.hasMany(models.Product)
  };

  Picture.uploadImage = (req, res, next) => {
    const imageUrl = req.files ? req.files.image.path : req.body.url
    console.log(imageUrl);
    cloudinary.uploader.upload(imageUrl).then((image) => {
      if (image) {
        res.locals.uploadedImage = image;
        next();
      } else {
        res.status(500).json({
          error: 'upload failed'
        })
      }
    });
  }

  Picture.deleteUpload = (req, res, next) => {
    if (req.params.id) {
      pictureId = req.params.id
    } else if (req.body.pictureId) {
      pictureId = req.body.pictureId
    } else if (res.locals.pictureId) {
      pictureId = res.locals.pictureId
    }

    Picture.findOne({
      where: {
        id: pictureId
      }
    }).then(picture => {
      if (picture) {
        cloudinary.uploader.destroy(picture.cloudinaryId).then((result) => {
          if (result.result === 'ok') {
            next();
          } else {
            res.status(500).json({
              error: 'delete failed'
            });
          }
        });
      } else {
        res.status(404).json({
          error: 'video with id ' + picture.id + ' does not exist'
        })
      }
    });
  }

  return Picture;
};
