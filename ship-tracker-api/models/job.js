"use strict";
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define(
    "Job",
    {
      title: DataTypes.STRING,
      job_number: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          Job.belongsTo(models.Company);
        }
      }
    }
  );
  return Job;
};
