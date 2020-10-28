'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pets.init({
    name: DataTypes.STRING,
    favorites: DataTypes.TEXT,
    userid: DataTypes.INTEGER,
    isPublished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pets',
  });
  return pets;
};