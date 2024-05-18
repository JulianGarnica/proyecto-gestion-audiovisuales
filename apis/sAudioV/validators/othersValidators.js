//Const of module required
const { body } = require("express-validator");

exports.implementoRegisterValidator = [
  body("codigo").isString().withMessage("Código es requerido"),
  body("implemento").isString().withMessage("Implemento es requerido"),
  body("caracteristicas").isString().withMessage("Caracteristicas es requerido"),
  body("estadoPrestamo").isString().withMessage("Estado de prestamo es requerido"),
];

exports.docenteRegisterValidator = [
  body("cedulaDocente").isString().withMessage("cedulaDocente es requerido"),
  body("nombre").isString().withMessage("nombre es requerido"),
  body("idSalon").isNumeric().withMessage("facultad es requerido"),
  body("idFacultad").isNumeric().withMessage("clase es requerido"),
];

exports.prestamoRegisterValidator = [
  body("fechaHoraEntrega").matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/).withMessage("El formato de la fecha es incorrecto, pruebe con este formato: 2022-09-13T00:00:00"),
  body("fechaHoraRecibido").matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/).withMessage("El formato de la fecha es incorrecto, pruebe con este formato: 2022-09-13T00:00:00"),
  body("observacion").isString().withMessage("observacion es requerido"),
  body("cedulaEncargado").isNumeric().withMessage("cedulaEncargado es requerido"),
  body("codigoRel").isNumeric().withMessage("codigoRel es requerido"),
  body("cedulaDocente").isNumeric().withMessage("cedulaDocente es requerido"),
  body("idClase").isNumeric().withMessage("idClase es requerido"),
];


exports.prestamoUpdateValidator = [
  body("codigo").isNumeric().withMessage("codigo es requerido"),
  body("fechaHoraEntrega").matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/).withMessage("El formato de la fecha es incorrecto, pruebe con este formato: 2022-09-13T00:00:00"),
  body("fechaHoraRecibido").matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/).withMessage("El formato de la fecha es incorrecto, pruebe con este formato: 2022-09-13T00:00:00"),
  body("estado").isString().withMessage("estado es requerido"),
  body("observacion").isString().withMessage("observacion es requerido"),
  body("cedulaEncargado").isNumeric().withMessage("cedulaEncargado es requerido"),
  body("codigoRel").isNumeric().withMessage("codigoRel es requerido"),
  body("cedulaDocente").isNumeric().withMessage("cedulaDocente es requerido"),
  body("idClase").isNumeric().withMessage("idClase es requerido"),
];

exports.facultadRegisterValidator = [
  body("nombreFacultad").isString().withMessage("Caracteristicas es requerido"),
];

exports.facultadChangerValidator = [
  body("idFacultad").isNumeric().withMessage("Código es requerido"),
  body("nombreFacultad").isString().withMessage("Implemento es requerido")
];

exports.salonRegisterValidator = [
  body("tipoSalon").isString().withMessage("tipoSalon es requerido"),
  body("ubicacion").isString().withMessage("ubicacion es requerido"),
];

exports.salonChangerValidator = [
  body("idSalon").isNumeric().withMessage("idSalon es requerido"),
  body("tipoSalon").isString().withMessage("tipoSalon es requerido"),
  body("ubicacion").isString().withMessage("ubicacion es requerido"),
];

exports.claseRegisterValidator = [
  body("nombreClase").isString().withMessage("nombreClase es requerido"),
  body("dia").isString().withMessage("dia es requerido"),
  body("horaInicio").isString().withMessage("horaInicio es requerido"),
  body("horaFinal").isString().withMessage("horaFinal es requerido"),
  body("idSalon").isNumeric().withMessage("idSalon es requerido"),
  body("idFacultad").isNumeric().withMessage("idFacultad es requerido"),
];
exports.claseChangerValidator = [
  body("idClase").isNumeric().withMessage("idClase es requerido"),
  body("dia").isString().withMessage("dia es requerido"),
  body("horaInicio").isString().withMessage("horaInicio es requerido"),
  body("horaFinal").isString().withMessage("horaFinal es requerido"),
  body("idSalon").isNumeric().withMessage("idSalon es requerido"),
  body("idFacultad").isNumeric().withMessage("idFacultad es requerido"),
];