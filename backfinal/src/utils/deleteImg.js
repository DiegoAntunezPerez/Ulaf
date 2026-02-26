const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configurar Cloudinary (asegúrate de tener las variables en .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Borrar archivo de Cloudinary por ID
const deleteFile = async (fileId) => {
  try {
    if (!fileId) return;
    
    // Si es una ruta local (para desarrollo sin Cloudinary)
    if (fileId.startsWith('uploads/') || fileId.startsWith('./uploads/')) {
      if (fs.existsSync(fileId)) {
        fs.unlinkSync(fileId);
        console.log('Archivo local eliminado:', fileId);
      }
      return;
    }
    
    // Si es un ID de Cloudinary
    const result = await cloudinary.uploader.destroy(fileId);
    console.log('Archivo de Cloudinary eliminado:', result);
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
  }
};

module.exports = { deleteFile };
