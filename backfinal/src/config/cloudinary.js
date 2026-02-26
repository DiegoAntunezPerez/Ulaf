const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configurar Cloudinary
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  cloudinary.api
    .ping()
    .then(() => console.log('Conectado a Cloudinary'))
    .catch(() => console.log('Error al conectar con Cloudinary'));
};

// Storage para productos
const storageProductos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Ulaf',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif']
  }
});

// Storage para usuarios
const storageUsuarios = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'usuarios',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

// Multer para productos
const uploadProducto = multer({ 
  storage: storageProductos,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB máximo
});

// Multer para usuarios
const uploadUsuario = multer({ 
  storage: storageUsuarios,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB máximo
});

module.exports = { 
  connectCloudinary, 
  cloudinary, 
  uploadProducto, 
  uploadUsuario 
};