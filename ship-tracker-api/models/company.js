"use strict";
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("company", {
    title: DataTypes.STRING
  });
  Company.associate = function(models) {
    Company.hasMany(models.job);

    Company.getShipments = function(companyId) {
      return models.job
        .findAll({
          where: {
            companyId
          }
        })
        .then(jobs =>
          models.shipment.findAll({
            where: {
              jobId: {
                $in: jobs.map(j => j.id)
              }
            },
            include: [
              {
                model: models.job
              }
            ]
          })
        );
    };
  };

  return Company;
};
