'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class sighting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Category, { through: "sighting_categories" });
    }
  }
  sighting.init({
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'sighting',
    underscored: true
  });
  return sighting;
};