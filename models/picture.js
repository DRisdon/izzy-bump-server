const Sequelize = require('sequelize'),
      sequelize = require('../db/config')


class Picture extends Sequelize.Model {}

Picture.init({
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  description: Sequelize.TEXT,
}, {
  sequelize
});


module.exports = Picture;
