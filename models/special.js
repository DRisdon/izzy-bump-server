const Sequelize = require('sequelize'),
      sequelize = require('../db/config')


class Special extends Sequelize.Model {}

Special.init({
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  start_date: Sequelize.DATE,
  end_date: Sequelize.DATE
}, {
  sequelize
});


module.exports = Special;
