//Const of module required
const express = require("express");
const ImplementoController = require("../controllers/implementoController");
const DocenteController = require("../controllers/docenteController");
const PrestamoController = require("../controllers/prestamoController");
const {
  implementoRegisterValidator,
  docenteRegisterValidator,
  prestamoRegisterValidator,
  prestamoUpdateValidator,
  facultadRegisterValidator,
  facultadChangerValidator,
  salonRegisterValidator,
  salonChangerValidator
} = require("../validators/othersValidators");
const router = require("../routes/userRoutes");
const authenticateToken = require('../middleware/authMiddleware');
const FacultadController = require("../controllers/facultadController");
const SalonController = require("../controllers/salonController");

//Lo dejo así porque me da pereza dividirlo todo en diferentes archivos de ruta XD
//Porfa, no lo hagan así, siempre traten de tenerlo ordenado
router.route('/implemento')
  .get(authenticateToken, ImplementoController.info)
  .post(implementoRegisterValidator, authenticateToken, ImplementoController.register)
  .put(implementoRegisterValidator, authenticateToken, ImplementoController.update)
  .delete(authenticateToken, ImplementoController.delete);

router.route('/docente')
  .get(authenticateToken, DocenteController.info)
  .post(docenteRegisterValidator, authenticateToken, DocenteController.register)
  .put(docenteRegisterValidator, authenticateToken, DocenteController.update)
  .delete(authenticateToken, DocenteController.delete);

router.route('/prestamo')
  .get(authenticateToken, PrestamoController.info)
  .post(prestamoRegisterValidator, authenticateToken, PrestamoController.register)
  .put(prestamoUpdateValidator, authenticateToken, PrestamoController.update)
  .delete(authenticateToken, PrestamoController.delete);

router.route('/facultad')
  .get(authenticateToken, FacultadController.info)
  .post(facultadRegisterValidator, authenticateToken, FacultadController.register)
  .put(facultadChangerValidator, authenticateToken, FacultadController.update)
  .delete(authenticateToken, FacultadController.delete);

router.route('/salon')
  .get(authenticateToken, SalonController.info)
  .post(salonRegisterValidator, authenticateToken, SalonController.register)
  .put(salonChangerValidator, authenticateToken, SalonController.update)
  .delete(authenticateToken, SalonController.delete);
module.exports = router;
