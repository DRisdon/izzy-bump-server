'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define('ProductOrder', {
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  ProductOrder.associate = function(models) {
    // associations can be defined here
  };
  return ProductOrder;
};