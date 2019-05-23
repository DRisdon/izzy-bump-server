'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Pictures',
      'featured', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Pictures', 'featured');
  }
};
