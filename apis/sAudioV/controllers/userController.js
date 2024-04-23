//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];


const SECRET_KEY = config.secret_key;
const Encargados = db.Encargados;

class UserController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cedulaEncargado, nombres, cargo, clave } = req.body;

    try {
      // Check if the user already exists
      Encargados.sync().then(function () {
        Encargados.findOne({ where: { cedulaEncargado: cedulaEncargado } })
          .then(async function (data) {
            if (data) {
              return res.status(400).json({ error: "Cédula de encargado ya existe" });
            } else {
              // Hash the clave
              const salt = await bcrypt.genSalt(10);
              const hashedclave = await bcrypt.hash(clave, salt);
              // Create a new user
              Encargados.create({
                cedulaEncargado: cedulaEncargado,
                nombres: nombres,
                cargo: cargo,
                clave: hashedclave,
              });
              // Respond with success
              res.status(201).json({ message: "Encargado registrado correctamente" });
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

  static async login(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cedulaEncargado, clave } = req.body;

    try {
      // Fetch the user from the database
      Encargados.sync().then(function () {
        Encargados.findOne({ where: { cedulaEncargado: cedulaEncargado } })
          .then(async function (data) {
            // Check if the clave matches
            bcrypt.compare(clave, data.clave, function (err, response) {
              if (err) {
                // handle error
                console.log("Error!", err);
                return res.status(500).json({ error: "Server error" });
              }
              if (response) {
                // Generate access token
                console.log(data)
                const accessToken = jwt.sign(
                  { userId: data.cedulaEncargado, name: data.nombres },
                  SECRET_KEY,
                  {
                    expiresIn: "300m",
                  }
                );
                // Generate refresh token (you can also save this in the database)
                const refreshToken = jwt.sign({ userId: data.cedulaEncargado }, SECRET_KEY, {
                  expiresIn: "7d",
                });
                // Respond with tokens
                return res.status(200).json({ accessToken, refreshToken });
              } else {
                return res.status(401).json({ error: "Invalid credentials" });
              }
            });
          })
          .catch((error) => {
            return res.status(401).json({ error: "Invalid credentials" });
          });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }

  static async infoUser(req, res) {
    const { q } = req.query;
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      q
      ? 
        Encargados.sync().then(function () {
          Encargados.findOne({ where: { cedulaEncargado: q }, attributes: { exclude: ['createdAt', 'updatedAt', 'clave'] } }).then(async function (data) {
            if(data){
              res.status(200).json({ user: data });
            }else{
              return res.status(403).json({ error: "Cédula no encontrada" });
            }
          });
        })
      : res.status(200).json({ user: req.user });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }


}
module.exports = UserController;
