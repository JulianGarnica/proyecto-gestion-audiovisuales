const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];

//Const of module required
const Op = db.Sequelize.Op;

//Change it to salon model

const SECRET_KEY = config.secret_key;
const Salon = db.Salon;

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


class SalonController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tipoSalon, ubicacion } = req.body;

    try {
      Salon.sync().then(function () {

        Salon.create({
          tipoSalon: tipoSalon,
          ubicacion: ubicacion
        });
        // Respond with success
        res.status(201).json({ message: "Salón registrado con éxito" });
            
        
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

    const { idSalon, tipoSalon, ubicacion } = req.body;

    try {
      Salon.sync().then(function () {
        Salon.findOne({ where: { idSalon: idSalon } })
          .then(async function (data) {
            if (data) {
              Salon.update({
                tipoSalon: tipoSalon,
                ubicacion: ubicacion
              },
              {
                where: {
                  idSalon: idSalon,
                },
              });
              res.status(201).json({ message: "Salón actualizado con éxito" });
            } else {
              return res.status(400).json({ error: "El código del salón no existe" });
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
        Salon.sync().then(function () {
          Salon.findOne({ where: { idSalon: q } }).then(async function (data) {
            if(data){
              res.status(200).json({ Salon: data });
            }else{
              return res.status(403).json({ error: "Salón no encontrado" });
            }
          });
        })
      : Salon.sync().then(function () {
        const condition = search
          ? {
              [Op.or]: [
                { idSalon: { [Op.like]: `%${search}%` } },
                { tipoSalon: { [Op.like]: `%${search}%` } },
                { ubicacion: { [Op.like]: `%${search}%` } }
              ],
            }
          : null;
        Salon.findAndCountAll({
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
        Salon.sync().then(function () {
          Salon.destroy({
            where: {
              idSalon: q
            },
          })
          res.status(200).json({ message: "Salón eliminado con éxito" })
        })
      : res.status(403).json({ error: "Consulta no válida" });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }


}
module.exports = SalonController;
