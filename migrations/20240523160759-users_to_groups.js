'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_to_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      groupId: {
        field: 'group_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'groups',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users_to_groups');
  }
};
