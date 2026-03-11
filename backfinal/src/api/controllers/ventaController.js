const Venta = require('../models/Venta');

// Crear venta
const postVenta = async (req, res, next) => {
  try {
    const newVenta = new Venta(req.body);
    const savedVenta = await newVenta.save();
    if (!savedVenta) {
      return res.status(400).json('La venta no ha sido creada');
    }
    return res.status(201).json(savedVenta);
  } catch (error) {
    return next(error);
  }
};

// Ver detalle de una venta
const getVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findById(id);
    if (!venta) return res.status(404).json('Venta no encontrada');
    return res.status(200).json(venta);
  } catch (error) {
    next(error);
  }
};

// Listar todas las ventas
const getAllVentas = async (req, res, next) => {
  try {
    const ventas = await Venta.find();
    return res.status(200).json(ventas);
  } catch (error) {
    next(error);
  }
};

// Editar venta
const putVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ventaUpdated = await Venta.findByIdAndUpdate(id, req.body, { new: true });
    if (!ventaUpdated) return res.status(404).json('Venta no encontrada');
    return res.status(200).json(ventaUpdated);
  } catch (error) {
    return next(error);
  }
};

// Borrar venta
const deleteVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ventaDeleted = await Venta.findByIdAndDelete(id);
    if (!ventaDeleted) return res.status(404).json('Venta no encontrada');
    return res.status(200).json('Venta eliminada');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postVenta,
  getVenta,
  getAllVentas,
  putVenta,
  deleteVenta
};
