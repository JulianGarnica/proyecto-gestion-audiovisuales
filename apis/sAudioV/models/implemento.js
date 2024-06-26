'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Implemento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Implemento.init({
    codigo: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    implemento: {
      allowNull: false,
      type: DataTypes.STRING
    },
    caracteristicas: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    estadoPrestamo: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Implemento',
  });
  return Implemento;
};