//Const of module required
const { body } = require("express-validator");

exports.registerValidator = [
  body("cedulaEncargado").isString().withMessage("La cédula del encargado es requerida"),
  body("nombres").isString().withMessage("El nombre es requerido"),
  body("cargo").isString().withMessage("El cargo es requerido"),

  body("clave")
    .isLength({ min: 3 })
    .withMessage("La contraseña debe de ser mínimo 3 caracteres"),
];

exports.loginValidator = [
  body("cedulaEncargado").isString().withMessage("Cédula inválida"),
  //body("password").isLength({ min: 6 }).withMessage("Invalid password"),
  body("clave").isLength({ min: 3 }).withMessage("Contraseña inválida"),
];
