const Articulo = require('../models/Articulo');
const { deleteFile } = require('../../utils/deleteImg.js'); // Asumiendo que tendrás lógica para borrar imágenes

// Crear artículo (solo admin)
const postArticulo = async (req, res, next) => {
  try {
    const articuloData = {
      idArticulo: req.body.idArticulo?.trim(),
      categoria: req.body.categoria?.trim(),
      marca: req.body.marca?.trim(),
      nombre: req.body.nombre?.trim(),
      precio: req.body.precio,
      stock_s: req.body.stock_s,
      stock_m: req.body.stock_m,
      stock_l: req.body.stock_l,
      stock_xl: req.body.stock_xl,
      estado: req.body.estado?.trim(),
      descripcion: req.body.descripcion?.trim()
    };
    
    // Prioridad 1: Archivo subido (Cloudinary)
    if (req.file) {
      articuloData.imagen = req.file.path;
      articuloData.imagenId = req.file.filename;
    }
    // Prioridad 2: URL proporcionada en el body
    else if (req.body.imagen) {
      // Validar que sea una URL válida
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
      if (!urlPattern.test(req.body.imagen)) {
        return res.status(400).json({ error: 'La URL de la imagen no es válida. Debe ser una URL completa que termine en .jpg, .jpeg, .png, .gif, .webp o .svg' });
      }
      articuloData.imagen = req.body.imagen.trim();
      articuloData.imagenId = null; // URL externa no tiene imagenId de Cloudinary
    }
    // Sin imagen
    else {
      return res.status(400).json({ error: 'Debes proporcionar una imagen (archivo o URL)' });
    }
    
    const newArticulo = new Articulo(articuloData);
    const savedArticulo = await newArticulo.save();
    if (!savedArticulo) {
      return res.status(400).json('El artículo no ha sido creado');
    }
    return res.status(201).json(savedArticulo);
  } catch (error) {
    if (req.file) {
      await deleteFile(req.file.path);
    }
    return next(error);
  }
};

// Ver detalle de un artículo
const getArticulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findById(id);
    if (!articulo) return res.status(404).json('Artículo no encontrado');
    return res.status(200).json(articulo);
  } catch (error) {
    next(error);
  }
};

// Listar todos los artículos
const getAllArticulos = async (req, res, next) => {
  try {
    const { categoria, marca } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Construir filtro
    const filter = {};
    if (categoria) filter.categoria = categoria;
    if (marca) filter.marca = marca;
    
    const articulos = await Articulo.find(filter).skip(skip).limit(limit);
    const total = await Articulo.countDocuments(filter);
    
    return res.status(200).json({
      articulos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Buscar y filtrar artículos
const searchArticulos = async (req, res, next) => {
  try {
    const { query, categoria, marca } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (query) filter.nombre = { $regex: query, $options: 'i' };
    if (categoria) filter.categoria = categoria;
    if (marca) filter.marca = marca;
    
    const articulos = await Articulo.find(filter).skip(skip).limit(limit);
    const total = await Articulo.countDocuments(filter);
    
    return res.status(200).json({
      articulos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Editar artículo (solo admin)
const editArticulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldArticulo = await Articulo.findById(id);
    if (!oldArticulo) return res.status(404).json('Artículo no encontrado');
    
    // Validar que haya algo que actualizar
    if (!req.body && !req.file) {
      return res.status(400).json({ error: 'Debes enviar al menos un campo para actualizar' });
    }
    
    // Crear objeto de actualización con trim en campos de texto
    const updateData = {};
    if (req.body.idArticulo) updateData.idArticulo = req.body.idArticulo.trim();
    if (req.body.categoria) updateData.categoria = req.body.categoria.trim();
    if (req.body.marca) updateData.marca = req.body.marca.trim();
    if (req.body.nombre) updateData.nombre = req.body.nombre.trim();
    if (req.body.precio !== undefined) updateData.precio = req.body.precio;
    if (req.body.stock_s !== undefined) updateData.stock_s = req.body.stock_s;
    if (req.body.stock_m !== undefined) updateData.stock_m = req.body.stock_m;
    if (req.body.stock_l !== undefined) updateData.stock_l = req.body.stock_l;
    if (req.body.stock_xl !== undefined) updateData.stock_xl = req.body.stock_xl;
    if (req.body.estado) updateData.estado = req.body.estado.trim();
    if (req.body.descripcion) updateData.descripcion = req.body.descripcion.trim();
    
    // Si viene archivo nuevo
    if (req.file) {
      // Eliminar imagen antigua solo si era de Cloudinary
      if (oldArticulo.imagenId) await deleteFile(oldArticulo.imagenId);
      updateData.imagen = req.file.path;
      updateData.imagenId = req.file.filename;
    }
    // Si viene URL nueva en el body
    else if (req.body?.imagen && req.body.imagen !== oldArticulo.imagen) {
      // Validar que sea una URL válida
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
      if (!urlPattern.test(req.body.imagen)) {
        return res.status(400).json({ error: 'La URL de la imagen no es válida. Debe ser una URL completa que termine en .jpg, .jpeg, .png, .gif, .webp o .svg' });
      }
      // Eliminar imagen antigua solo si era de Cloudinary
      if (oldArticulo.imagenId) await deleteFile(oldArticulo.imagenId);
      updateData.imagen = req.body.imagen;
      updateData.imagenId = null; // URL externa no tiene imagenId
    }
    // Si no hay nueva imagen, mantener la antigua (no incluir en updateData)
    
    const articuloUpdated = await Articulo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
    if (!articuloUpdated) return res.status(404).json('Artículo no encontrado');
    return res.status(200).json(articuloUpdated);
  } catch (error) {
    return next(error);
  }
};

// Borrar artículo (solo admin)
const deleteArticulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findById(id);
    if (!articulo) return res.status(404).json('Artículo no encontrado');
    if (articulo.imagenId) await deleteFile(articulo.imagenId);
    await Articulo.findByIdAndDelete(id);
    return res.status(200).json('Artículo eliminado');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postArticulo,
  getArticulo,
  getAllArticulos,
  searchArticulos,
  editArticulo,
  deleteArticulo
};
