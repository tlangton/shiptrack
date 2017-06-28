"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Shipments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tracking_number: {
        type: Sequelize.STRING
      },
      ship_date: {
        type: Sequelize.STRING
      },
      ship_to_address: {
        type: Sequelize.STRING
      },
      job_id: {
        allowNull: false,
        references: { model: "Jobs", key: "id" },
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("Shipments");
  }
};
