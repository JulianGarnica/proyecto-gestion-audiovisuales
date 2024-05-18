//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];
const Op = db.Sequelize.Op;


const SECRET_KEY = config.secret_key;
const Docente = db.Docente;

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


class DocenteController {

  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cedulaDocente, nombre, idSalon, idFacultad } = req.body;

    try {
      Docente.sync().then(function () {
        Docente.findOne({ where: { cedulaDocente: cedulaDocente } })
          .then(async function (data) {
            if (data) {
              return res.status(400).json({ error: "El código del Docente ya existe" });
            } else {
              try {
                Docente.create({
                  cedulaDocente: cedulaDocente,
                  nombre: nombre,
                  idSalon: idSalon,
                  idFacultad: idFacultad
                });
                // Respond with success
                res.status(201).json({ message: "Docente registrado con éxito" });
              } catch (error) {
                res.status(500).json({ message: "Server error: "+error });
              }
              
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

    const { cedulaDocente, nombre, idSalon, idFacultad } = req.body;

    try {
      Docente.sync().then(function () {
        Docente.findOne({ where: { cedulaDocente: cedulaDocente } })
          .then(async function (data) {
            if (data) {
              try {
                Docente.update({
                  nombre: nombre,
                  idSalon: idSalon,
                  idFacultad: idFacultad
                },
                {
                  where: {
                    cedulaDocente: cedulaDocente,
                  },
                });
                res.status(201).json({ message: "Docente actualizado con éxito" });
              } catch (error) {
                res.status(500).json({ message: "Server error: "+error });
              }
              
            } else {
              return res.status(400).json({ error: "El código del Docente no existe" });
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
        Docente.sync().then(function () {
          Docente.findOne({ where: { cedulaDocente: q },
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
            ] }).then(async function (data) {
            if(data){
              res.status(200).json({ Docente: data });
            }else{
              return res.status(403).json({ error: "Docente no encontrado" });
            }
          });
        })
      : Docente.sync().then(function () {
          const condition = search
            ? {
                [Op.or]: [
                  { nombre: { [Op.like]: `%${search}%` } },
                  { idFacultad: { [Op.like]: `%${search}%` } },
                  { idSalon: { [Op.like]: `%${search}%` } }
                ],
              }
            : null;
          Docente.findAndCountAll({
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
          }).then((data) => {
            res.send(getPagingData(data, page, limit) );
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
        Docente.sync().then(function () {
          Docente.destroy({
            where: {
              cedulaDocente: q
            },
          })
          res.status(200).json({ message: "Docente eliminado con éxito" })
        })

        
      : res.status(403).json({ error: "Consulta no válida" });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }


}
module.exports = DocenteController;
