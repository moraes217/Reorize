'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_registries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_account: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'tb_accounts',
          key: 'id'
        }
      },
      desc_registry: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_category: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'tb_categories',
          key: 'id'
        }
      },
      vl_registry: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      type_registry: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_registries');
  }
};