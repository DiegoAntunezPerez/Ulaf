const { body, param, query, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones para registro de usuario
const validateRegister = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
  body('telefono')
    .optional()
    .trim()
    .isLength({ min: 9, max: 15 }).withMessage('El teléfono debe tener entre 9 y 15 caracteres'),
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('La dirección no puede superar los 200 caracteres'),
  handleValidationErrors
];

// Validaciones para login
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  handleValidationErrors
];

// Validaciones para crear artículo (campos obligatorios)
const validateCreateArticulo = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .toFloat() // Convierte string a número (importante para Multipart Form)
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria'),
  body('marca')
    .trim()
    .notEmpty().withMessage('La marca es obligatoria'),
  body('stock_s')
    .optional()
    .toInt()
    .isInt({ min: 0 }).withMessage('El stock S debe ser un número entero positivo'),
  body('stock_m')
    .optional()
    .toInt()
    .isInt({ min: 0 }).withMessage('El stock M debe ser un número entero positivo'),
  body('stock_l')
    .optional()
    .toInt()
    .isInt({ min: 0 }).withMessage('El stock L debe ser un número entero positivo'),
  body('stock_xl')
    .optional()
    .toInt()
    .isInt({ min: 0 }).withMessage('El stock XL debe ser un número entero positivo'),
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La descripción no puede superar los 500 caracteres'),
  handleValidationErrors
];

// Validaciones para editar artículo (campos opcionales)
const validateUpdateArticulo = [
  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('precio')
    .optional()
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('categoria')
    .optional()
    .trim()
    .notEmpty().withMessage('La categoría no puede estar vacía'),
  body('marca')
    .optional()
    .trim()
    .notEmpty().withMessage('La marca no puede estar vacía'),
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La descripción no puede superar los 500 caracteres'),
  body('stock_s')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock S debe ser un número entero positivo'),
  body('stock_m')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock M debe ser un número entero positivo'),
  body('stock_l')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock L debe ser un número entero positivo'),
  body('stock_xl')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock XL debe ser un número entero positivo'),
  handleValidationErrors
];

// Validación de ID de MongoDB
const validateMongoId = [
  param('id')
    .isMongoId().withMessage('ID inválido'),
  handleValidationErrors
];

// Validación para búsqueda de artículos
const validateSearch = [
  query('query')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('La búsqueda debe tener entre 1 y 100 caracteres'),
  query('categoria')
    .optional()
    .trim(),
  query('marca')
    .optional()
    .trim(),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('La página debe ser un número mayor a 0'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('El límite debe estar entre 1 y 100'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateArticulo,
  validateUpdateArticulo,
  validateMongoId,
  validateSearch
};
