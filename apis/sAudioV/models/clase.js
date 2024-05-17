'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clase.belongsTo(models.Facultad, {
        as: "facultadFK",
        foreignKey: "idFacultad",
      });
      Clase.belongsTo(models.Salon, {
        as: "salonFK",
        foreignKey: "idSalon",
      });
    }
  }
  Clase.init({
    idClase: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombreClase: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dia: {
      allowNull: false,
      type: DataTypes.STRING
    },
    horaInicio: {
      allowNull: false,
      type: DataTypes.STRING
    },
    horaFin: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Clase',
  });
  return Clase;
};