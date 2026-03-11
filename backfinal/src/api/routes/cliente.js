const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/admin');
const { validateMongoId } = require('../../middlewares/validators');

// Listar todos los clientes
router.get('/', isAuth, clienteController.getAllClientes);

// Ver detalle de un cliente
router.get('/:id', isAuth, validateMongoId, clienteController.getCliente);

// Crear cliente (requiere autenticación)
router.post('/', isAuth, clienteController.postCliente);

// Editar cliente (requiere autenticación)
router.put('/:id', isAuth, validateMongoId, clienteController.putCliente);

// Borrar cliente (solo admin)
router.delete('/:id', isAuth, isAdmin, validateMongoId, clienteController.deleteCliente);

module.exports = router;
