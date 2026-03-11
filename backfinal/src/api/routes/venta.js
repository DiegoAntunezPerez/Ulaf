const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/admin');
const { validateMongoId } = require('../../middlewares/validators');

// Listar todas las ventas (admin)
router.get('/', isAuth, isAdmin, ventaController.getAllVentas);

// Ver detalle de una venta (admin)
router.get('/:id', isAuth, isAdmin, validateMongoId, ventaController.getVenta);

// Crear venta (requiere autenticación)
router.post('/', isAuth, ventaController.postVenta);

// Editar venta (solo admin)
router.put('/:id', isAuth, isAdmin, validateMongoId, ventaController.putVenta);

// Borrar venta (solo admin)
router.delete('/:id', isAuth, isAdmin, validateMongoId, ventaController.deleteVenta);

module.exports = router;
