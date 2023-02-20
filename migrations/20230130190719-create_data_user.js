'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'UserData',
        {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          userId: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
          dataId: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
        }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserData');
  }
};
