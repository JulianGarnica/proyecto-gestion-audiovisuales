'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prestamo.belongsTo(models.Encargados, {
        as: "cedulaEncargadoFK",
        foreignKey: "cedulaEncargado",
      });
      Prestamo.belongsTo(models.Implemento, {
        as: "codigoFK",
        foreignKey: "codigo",
      });
      Prestamo.belongsTo(models.Docente, {
        as: "cedulaDocenteFK",
        foreignKey: "cedulaDocente",
      });
      Prestamo.belongsTo(models.Clase, {
        as: "claseFK",
        foreignKey: "idClase",
      });
    }
  }
  Prestamo.init({
    idPrestamo: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fechaHoraEntrega: {
      allowNull: false,
      type: DataTypes.DATE
    },
    fechaHoraRecibido: {
      allowNull: false,
      type: DataTypes.DATE
    },
    estado: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    observacion: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Prestamo',
  });
  return Prestamo;
};