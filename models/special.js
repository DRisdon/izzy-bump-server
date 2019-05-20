'use strict';
module.exports = (sequelize, DataTypes) => {
  const Special = sequelize.define('Special', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Special.associate = function(models) {
    // associations can be defined here
  };
  return Special;
};
