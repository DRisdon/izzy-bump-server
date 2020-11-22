'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderTotal: DataTypes.FLOAT,
    shipped: DataTypes.BOOLEAN,
    trackingId: DataTypes.STRING,
    trackingUrl: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};