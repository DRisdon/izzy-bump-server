'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    pictureId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    isArtwork: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};