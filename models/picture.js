'use strict';
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
          ['artwork', 'tattoo']
        ]
      }
    },
    thumbnail: DataTypes.STRING,
    cloudinaryId: DataTypes.STRING,
    featured: DataTypes.BOOLEAN
  }, {});
  Picture.associate = function(models) {
    // associations can be defined here
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
    Picture.findOne({
      where: {
        id: req.params.id
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
