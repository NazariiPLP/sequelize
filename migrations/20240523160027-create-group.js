'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imagePath: {
        field:'image_path',
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        field: 'craeted_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        filed: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('groups');
  }
};

/*

groups ----
            groups_to_users
users -----

m:n

*/