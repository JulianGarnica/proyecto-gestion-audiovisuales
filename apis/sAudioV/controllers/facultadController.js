//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];
const Op = db.Sequelize.Op;


const SECRET_KEY = config.secret_key;
const Facultad = db.Facultad;

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


class FacultadController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombreFacultad } = req.body;

    try {
      Facultad.sync().then(function () {
        Facultad.findOne({ where: { nombreFacultad: nombreFacultad } })
          .then(async function (data) {
            if (data) {
              return res.status(400).json({ error: "El nombre del Facultad ya existe" });
            } else {
              Facultad.create({
                nombreFacultad: nombreFacultad
              });
              // Respond with success
              res.status(201).json({ message: "Facultad registrado con éxito" });
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

    const { idFacultad, nombreFacultad } = req.body;

    try {
      Facultad.sync().then(function () {
        Facultad.findOne({ where: { idFacultad: idFacultad } })
          .then(async function (data) {
            if (data) {
              Facultad.update({
                nombreFacultad: nombreFacultad
              },
              {
                where: {
                  idFacultad: idFacultad,
                },
              });
              res.status(201).json({ message: "Facultad actualizado con éxito" });
            } else {
              return res.status(400).json({ error: "El código del Facultad no existe" });
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
        Facultad.sync().then(function () {
          Facultad.findOne({ where: { idFacultad: q } }).then(async function (data) {
            if(data){
              res.status(200).json({ Facultad: data });
            }else{
              return res.status(403).json({ error: "Facultad no encontrado" });
            }
          });
        })
      : Facultad.sync().then(function () {
        const condition = search
          ? {
              [Op.or]: [
                { idFacultad: { [Op.like]: `%${search}%` } },
                { nombreFacultad: { [Op.like]: `%${search}%` } }
              ],
            }
          : null;
        Facultad.findAndCountAll({
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
        Facultad.sync().then(function () {
          Facultad.destroy({
            where: {
              idFacultad: q
            },
          })
          res.status(200).json({ message: "Facultad eliminado con éxito" })
        })
      : res.status(403).json({ error: "Consulta no válida" });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }


}
module.exports = FacultadController;
