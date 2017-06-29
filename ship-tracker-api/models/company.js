"use strict";
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("company", {
    title: DataTypes.STRING
  });
  Company.associate = function(models) {
    Company.hasMany(models.job);
  };
  return Company;
};
