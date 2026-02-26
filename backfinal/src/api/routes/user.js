const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/admin');
const { validateRegister, validateLogin, validateMongoId } = require('../../middlewares/validators');

// Registro y login
router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);

// Obtener todos los usuarios (solo admin)
router.get('/', isAuth, isAdmin, userController.getAllUsers);

// Obtener usuario por ID
router.get('/:id', isAuth, validateMongoId, userController.getUserById);

// Editar usuario (solo el propio usuario o admin)
router.put('/:id', isAuth, validateMongoId, userController.editUser);

// Borrar usuario (solo admin)
router.delete('/:id', isAuth, isAdmin, validateMongoId, userController.deleteUser);

module.exports = router;
