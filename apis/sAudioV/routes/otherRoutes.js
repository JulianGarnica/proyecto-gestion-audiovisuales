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
  salonChangerValidator,
  claseRegisterValidator,
  claseChangerValidator
} = require("../validators/othersValidators");
const router = require("../routes/userRoutes");
const authenticateToken = require('../middleware/authMiddleware');
const FacultadController = require("../controllers/facultadController");
const SalonController = require("../controllers/salonController");
const ClaseController = require("../controllers/claseController");
const cors = require("cors")

router.use(cors())
router.options('*', cors()) 

//Lo dejo así porque me da pereza dividirlo todo en diferentes archivos de ruta XD
//Porfa, no lo hagan así, siempre traten de tenerlo ordenado
router.route('/implemento', cors())
  .get(authenticateToken, ImplementoController.info)
  .post(implementoRegisterValidator, authenticateToken, ImplementoController.register)
  .put(implementoRegisterValidator, authenticateToken, ImplementoController.update)
  .delete(authenticateToken, ImplementoController.delete);

router.route('/docente', cors())
  .get(authenticateToken, DocenteController.info)
  .post(docenteRegisterValidator, authenticateToken, DocenteController.register)
  .put(docenteRegisterValidator, authenticateToken, DocenteController.update)
  .delete(authenticateToken, DocenteController.delete);

router.route('/prestamo', cors())
  .get(authenticateToken, PrestamoController.info)
  .post(prestamoRegisterValidator, authenticateToken, PrestamoController.register)
  .put(prestamoUpdateValidator, authenticateToken, PrestamoController.update)
  .delete(authenticateToken, PrestamoController.delete);

router.route('/facultad', cors())
  .get(authenticateToken, FacultadController.info)
  .post(facultadRegisterValidator, authenticateToken, FacultadController.register)
  .put(facultadChangerValidator, authenticateToken, FacultadController.update)
  .delete(authenticateToken, FacultadController.delete);

router.route('/salon', cors())
  .get(authenticateToken, SalonController.info)
  .post(salonRegisterValidator, authenticateToken, SalonController.register)
  .put(salonChangerValidator, authenticateToken, SalonController.update)
  .delete(authenticateToken, SalonController.delete);

router.route('/clase', cors())
  .get(authenticateToken, ClaseController.info)
  .post(claseRegisterValidator, authenticateToken, ClaseController.register)
  .put(claseChangerValidator, authenticateToken, ClaseController.update)
  .delete(authenticateToken, ClaseController.delete);
module.exports = router;
