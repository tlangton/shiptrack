"use strict";
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("job", {
    title: DataTypes.STRING,
    job_number: DataTypes.STRING
  });
  Job.associate = function(models) {
    Job.belongsTo(models.company);
  };
  return Job;
};
