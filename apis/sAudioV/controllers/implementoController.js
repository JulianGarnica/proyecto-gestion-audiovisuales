//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];
const Op = db.Sequelize.Op;


const SECRET_KEY = config.secret_key;
const Implemento = db.Implemento;

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


class ImplementoController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { codigo, implemento, caracteristicas, estadoPrestamo } = req.body;

    try {
      Implemento.sync().then(function () {
        Implemento.findOne({ where: { codigo: codigo } })
          .then(async function (data) {
            if (data) {
              return res.status(400).json({ error: "El código del implemento ya existe" });
            } else {
              Implemento.create({
                codigo: codigo,
                implemento: implemento,
                caracteristicas: caracteristicas,
                estadoPrestamo: estadoPrestamo
              });
              // Respond with success
              res.status(201).json({ message: "Implemento registrado con éxito" });
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

  static async update(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { codigo, implemento, caracteristicas, estadoPrestamo } = req.body;

    try {
      Implemento.sync().then(function () {
        Implemento.findOne({ where: { codigo: codigo } })
          .then(async function (data) {
            if (data) {
              Implemento.update({
                implemento: implemento,
                caracteristicas: caracteristicas,
                estadoPrestamo: estadoPrestamo
              },
              {
                where: {
                  codigo: codigo,
                },
              });
              res.status(201).json({ message: "Implemento actualizado con éxito" });
            } else {
              return res.status(400).json({ error: "El código del implemento no existe" });
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
        Implemento.sync().then(function () {
          Implemento.findOne({ where: { codigo: q } }).then(async function (data) {
            if(data){
              res.status(200).json({ implemento: data });
            }else{
              return res.status(403).json({ error: "Implemento no encontrado" });
            }
          });
        })
      : Implemento.sync().then(function () {
        const condition = search
          ? {
              [Op.or]: [
                { codigo: { [Op.like]: `%${search}%` } },
                { implemento: { [Op.like]: `%${search}%` } },
                { caracteristicas: { [Op.like]: `%${search}%` } },
                { estadoPrestamo: { [Op.like]: `%${search}%`} }
              ],
            }
          : null;
        Implemento.findAndCountAll({
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
        Implemento.sync().then(function () {
          Implemento.destroy({
            where: {
              codigo: q
            },
          })
          res.status(200).json({ message: "Implemento eliminado con éxito" })
        })
      : res.status(403).json({ error: "Consulta no válida" });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }


}
module.exports = ImplementoController;
