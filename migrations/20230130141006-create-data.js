'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
      },
      idNasa: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      camera: {
          type: Sequelize.JSON,
          allowNull: false,
          defaultValue: {},
          get() {
              return JSON.parse(this.getDataValue('camera'))
          },
          set(value) {
              this.setDataValue('camera', JSON.stringify(value))
          }
      },
      img_src: {
          type: Sequelize.STRING,
      },
      earth_date: {
          type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('data');
  }
};