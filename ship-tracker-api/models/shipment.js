const ups = require("../services/ups");

("use strict");
module.exports = function(sequelize, DataTypes) {
  var Shipment = sequelize.define("shipment", {
    trackingNumber: DataTypes.STRING,
    shipDate: DataTypes.STRING,
    shipToAddress: DataTypes.STRING,
    jobId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    eta: DataTypes.DATE,
    service: DataTypes.STRING,
    weight: DataTypes.STRING,
    destination: DataTypes.STRING
  });

  Shipment.associate = function(models) {
    Shipment.belongsTo(models.job);
  };

  Shipment.prototype.updateShippingInfo = function(callback) {
    ups.getTrackingInfo(this.trackingNumber, result => {
      if (result) {
        this.service = result.service;
        this.weight = result.weight;
        this.destination = result.destination;
        this.status = result.status;
        this.save().then(() => callback(true)).catch(() => callback(false));
      } else {
        callback(false);
      }
    });
  };

  return Shipment;
};
