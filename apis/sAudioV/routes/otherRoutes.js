//Const of module required
const express = require("express");
const ImplementoController = require("../controllers/implementoController");
const DocenteController = require("../controllers/docenteController");
const PrestamoController = require("../controllers/prestamoController");
const {
  implementoRegisterValidator,
  docenteRegisterValidator,
  prestamoRegisterValidator,
  prestamoUpdateValidator
} = require("../validators/othersValidators");
const router = require("../routes/userRoutes");
const authenticateToken = require('../middleware/authMiddleware')

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

module.exports = router;
