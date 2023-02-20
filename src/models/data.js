'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.data.belongsToMany(models.user, {
        through: 'UserData',
        as: 'favoritedBy',
        foreignKey: 'dataId'
        });
    }
  }
  data.init({
    idNasa: DataTypes.STRING,
    img_src: DataTypes.STRING,
    earth_date: DataTypes.STRING,
    camera: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'data',
  });
  return data;
};