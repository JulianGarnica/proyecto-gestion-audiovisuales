'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Encargados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Encargados.init({
    cedulaEncargado: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombres: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cargo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    clave: {
      allowNull: false,
      type:DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Encargados',
  });
  return Encargados;
};