//Const of module required
const { body } = require("express-validator");

exports.implementoRegisterValidator = [
  body("codigo").isString().withMessage("Código es requerido"),
  body("implemento").isString().withMessage("Implemento es requerido"),
  body("caracteristicas").isString().withMessage("Caracteristicas es requerido"),
];

exports.docenteRegisterValidator = [
  body("cedulaDocente").isString().withMessage("cedulaDocente es requerido"),
  body("nombre").isString().withMessage("nombre es requerido"),
  body("facultad").isString().withMessage("facultad es requerido"),
  body("clase").isString().withMessage("clase es requerido"),
];

exports.prestamoRegisterValidator = [
  body("fecha").matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/).withMessage("El formato de la fecha es incorrecto, pruebe con este formato: 2022-09-13T00:00:00"),
  body("salon").isString().withMessage("salon es requerido"),
  body("estado").isString().withMessage("estado es requerido"),
  body("observacion").isString().withMessage("observacion es requerido"),
  body("cedulaEncargado").isNumeric().withMessage("cedulaEncargado es requerido"),
  body("codigoRel").isNumeric().withMessage("codigoRel es requerido"),
  body("cedulaDocente").isNumeric().withMessage("cedulaDocente es requerido"),
];

exports.prestamoUpdateValidator = [
  body("codigo").isNumeric().withMessage("codigo es requerido"),
  body("fecha").matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/).withMessage("El formato de la fecha es incorrecto, pruebe con este formato: 2022-09-13T00:00:00"),
  body("salon").isString().withMessage("salon es requerido"),
  body("estado").isString().withMessage("estado es requerido"),
  body("observacion").isString().withMessage("observacion es requerido"),
  body("cedulaEncargado").isNumeric().withMessage("cedulaEncargado es requerido"),
  body("codigoRel").isNumeric().withMessage("codigoRel es requerido"),
  body("cedulaDocente").isNumeric().withMessage("cedulaDocente es requerido"),
];