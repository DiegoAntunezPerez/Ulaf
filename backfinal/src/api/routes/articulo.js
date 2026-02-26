const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articuloController');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/admin');
const { validateCreateArticulo, validateUpdateArticulo, validateMongoId, validateSearch } = require('../../middlewares/validators');
const { uploadProducto } = require('../../config/cloudinary');


// Listar todos los artículos
router.get('/', articuloController.getAllArticulos);

// Buscar y filtrar artículos
router.get('/search', validateSearch, articuloController.searchArticulos);

// Ver detalle de un artículo
router.get('/:id', validateMongoId, articuloController.getArticulo);

// Crear artículo (solo admin)
router.post('/', isAuth, isAdmin, uploadProducto.single('imagen'), validateCreateArticulo, articuloController.postArticulo);

// Editar artículo (solo admin)
router.put('/:id', isAuth, isAdmin, validateMongoId, uploadProducto.single('imagen'), validateUpdateArticulo, articuloController.editArticulo);

// Borrar artículo (solo admin)
router.delete('/:id', isAuth, isAdmin, validateMongoId, articuloController.deleteArticulo);

module.exports = router;
