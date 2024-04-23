//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];
const Op = db.Sequelize.Op;


const SECRET_KEY = config.secret_key;
const Prestamo = db.Prestamo;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: dataResult } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, dataResult, totalPages, currentPage };
};


class PrestamoController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fecha, salon, estado, observacion, cedulaEncargado, codigoRel, cedulaDocente } = req.body;

    try {
      Prestamo.sync().then(async function () {
        try {
            const data = await Prestamo.create({
              fecha: fecha,
              salon: salon,
              estado: estado,
              observacion: observacion,
              cedulaEncargado: cedulaEncargado,
              codigo: codigoRel,
              cedulaDocente: cedulaDocente
            });
            // Respond with success
            res.status(201).json({ message: "Préstamo registrado con éxito" });
        } catch (err) {
          console.error(err);
          res.status(400).json({ error: "Llaves foráneas no encontradas" });
        }  
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async update(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { codigo, fecha, salon, estado, observacion, cedulaEncargado, codigoRel, cedulaDocente } = req.body;

    try {
      Prestamo.sync().then(function () {
        Prestamo.findOne({ where: { idPrestamo: codigo } })
          .then(async function (data) {
            if (data) {
              Prestamo.update({
                fecha: fecha,
                salon: salon,
                estado: estado,
                observacion: observacion,
                cedulaEncargado: cedulaEncargado,
                codigo: codigoRel,
                cedulaDocente: cedulaDocente
              },
              {
                where: {
                  idPrestamo: codigo,
                },
              });
              res.status(201).json({ message: "Préstamo actualizado con éxito" });
            } else {
              return res.status(400).json({ error: "El código del préstamo no existe" });
            }
          })
          .catch(async (error) => {
            console.log(error);
            res.status(500).json({ message: "Server error" });
          });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async info(req, res) {
    const { q, page, size, search } = req.query;
    const { limit, offset } = getPagination(page-1, size);
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      q
      ? 
        Prestamo.sync().then(function () {
          Prestamo.findOne({ where: { idPrestamo: q } }).then(async function (data) {
            if(data){
              res.status(200).json({ Prestamo: data });
            }else{
              return res.status(403).json({ error: "Préstamo no encontrado" });
            }
          });
        })
      : Prestamo.sync().then(function () {
        const condition = search
          ? {
              [Op.or]: [
                { fecha: { [Op.like]: `%${search}%` } },
                { salon: { [Op.like]: `%${search}%` } },
                { estado: { [Op.like]: `%${search}%` } },
                { observacion: { [Op.like]: `%${search}%` } },
                { cedulaEncargado: { [Op.like]: `%${search}%` } },
                { codigo: { [Op.like]: `%${search}%` } },
                { cedulaDocente: { [Op.like]: `%${search}%` } }
              ],
            }
          : null;
        Prestamo.findAndCountAll({
          where: condition,
          limit,
          offset,
        }).then((data) => {
          res.send( getPagingData(data, page, limit) );
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Error query",
          });
        });
      })
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async delete(req, res) {
    const { q } = req.query;
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      q
      ? 
        Prestamo.sync().then(function () {
          Prestamo.destroy({
            where: {
              idPrestamo: q
            },
          })
          res.status(200).json({ message: "Préstamo eliminado con éxito" })
        })
      : res.status(403).json({ error: "Consulta no válida" });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }


}
module.exports = PrestamoController;
