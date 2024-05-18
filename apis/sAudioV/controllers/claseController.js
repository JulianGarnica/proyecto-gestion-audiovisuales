const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];

//Const of module required
const Op = db.Sequelize.Op;

const SECRET_KEY = config.secret_key;
const Clase = db.Clase;

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

class ClaseController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombreClase, dia, horaInicio, horaFinal, idSalon, idFacultad } =
      req.body;

    try {
      Clase.sync().then(async function () {
        try {
          const salon = await db.Salon.findOne({ where: { idSalon: idSalon } });
          const facultad = await db.Facultad.findOne({
            where: { idFacultad: idFacultad },
          });

          if (!salon) {
            return res.status(400).json({ error: "El idSalon no existe" });
          }

          if (!facultad) {
            return res.status(400).json({ error: "El idFacultad no existe" });
          }

          const data = await Clase.create({
            nombreClase: nombreClase,
            dia: dia,
            horaInicio: horaInicio,
            horaFin: horaFinal,
            idSalon: idSalon,
            idFacultad: idFacultad,
          });

          // Respond with success
          res.status(201).json({ message: "Clase registrada con éxito" });
        } catch (err) {
          console.error(err);
          res.status(400).json({ error: "Error al registrar la clase" });
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

    const {
      idClase,
      nombreClase,
      dia,
      horaInicio,
      horaFinal,
      idSalon,
      idFacultad,
    } = req.body;

    try {
      Clase.sync().then(function () {
        Clase.findOne({ where: { idClase: idClase } })
          .then(async function (data) {
            if (data) {
              const salon = await db.Salon.findOne({
                where: { idSalon: idSalon },
              });
              const facultad = await db.Facultad.findOne({
                where: { idFacultad: idFacultad },
              });

              if (!salon) {
                return res.status(400).json({ error: "El idSalon no existe" });
              }

              if (!facultad) {
                return res
                  .status(400)
                  .json({ error: "El idFacultad no existe" });
              }

              Clase.update(
                {
                  nombreClase: nombreClase,
                  dia: dia,
                  horaInicio: horaInicio,
                  horaFin: horaFinal,
                  idSalon: idSalon,
                  idFacultad: idFacultad,
                },
                {
                  where: {
                    idClase: idClase,
                  },
                }
              );
              res.status(201).json({ message: "Clase actualizada con éxito" });
            } else {
              return res
                .status(400)
                .json({ error: "El código de la clase no existe" });
            }
          })
          .catch(async (error) => {
            console.log(error);
            res.status(500).json({ message: "Error del servidor" });
          });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async info(req, res) {
    const { q, page, size, search } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      q
        ? Clase.sync().then(function () {
            Clase.findOne({ where: { idClase: q },
              include: [
                {
                  model: db.Facultad,
                  as: "facultadFK",
                  attributes: ["nombreFacultad"],
                },
                {
                  model: db.Salon,
                  as: "salonFK",
                  attributes: ["tipoSalon", "ubicacion"],
                },
              ] }).then(async function (
              data
            ) {
              if (data) {
                res.status(200).json({ Clase: data });
              } else {
                return res.status(403).json({ error: "Clase no encontrada" });
              }
            });
          })
        : Clase.sync().then(function () {
            const condition = search
              ? {
                  [Op.or]: [
                    { nombreClase: { [Op.like]: `%${search}%` } },
                    { dia: { [Op.like]: `%${search}%` } },
                    { horaInicio: { [Op.like]: `%${search}%` } },
                    { horaFin: { [Op.like]: `%${search}%` } },
                    { idSalon: { [Op.like]: `%${search}%` } },
                    { idFacultad: { [Op.like]: `%${search}%` } },
                  ],
                }
              : null;
            Clase.findAndCountAll({
              where: condition,
              limit,
              offset,
              include: [
                {
                  model: db.Facultad,
                  as: "facultadFK",
                  attributes: ["nombreFacultad"],
                },
                {
                  model: db.Salon,
                  as: "salonFK",
                  attributes: ["tipoSalon", "ubicacion"],
                },
              ],
            })
              .then((data) => {
                res.send(getPagingData(data, page, limit));
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "Error de consulta",
                });
              });
          });
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
        ? Clase.sync().then(function () {
            Clase.destroy({
              where: {
                idClase: q,
              },
            });
            res.status(200).json({ message: "Clase eliminada con éxito" });
          })
        : res.status(403).json({ error: "Consulta no válida" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}

module.exports = ClaseController;
