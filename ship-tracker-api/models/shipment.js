"use strict";
module.exports = function(sequelize, DataTypes) {
  var Shipment = sequelize.define(
    "shipment",
    {
      tracking_number: DataTypes.STRING,
      ship_date: DataTypes.STRING,
      ship_to_address: DataTypes.STRING,
      job_id: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          Shipment.belongsTo(models.Job);
        }
      }
    }
  );
  return Shipment;
};
