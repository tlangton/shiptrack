"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("shipments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trackingNumber: {
        type: Sequelize.STRING
      },
      shipDate: {
        type: Sequelize.STRING
      },
      shipToAddress: {
        type: Sequelize.STRING
      },
      jobId: {
        allowNull: false,
        references: { model: "jobs", key: "id" },
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      eta: {
        type: Sequelize.DATE
      },
      destination: {
        type: Sequelize.STRING
      },
      service: {
        type: Sequelize.STRING
      },
      weight: {
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
    return queryInterface.dropTable("shipments");
  }
};
