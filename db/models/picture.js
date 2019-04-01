'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    pictureType: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['artwork', 'tattoo']]
      }
    }
  }, {});
  Picture.associate = function(models) {
    // associations can be defined here
  };
  return Picture;
};
