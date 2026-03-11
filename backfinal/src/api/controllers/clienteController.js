const Cliente = require('../models/Cliente');

// Crear cliente
const postCliente = async (req, res, next) => {
  try {
    const newCliente = new Cliente(req.body);
    const savedCliente = await newCliente.save();
    if (!savedCliente) {
      return res.status(400).json('El cliente no ha sido creado');
    }
    return res.status(201).json(savedCliente);
  } catch (error) {
    return next(error);
  }
};

// Ver detalle de un cliente
const getCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    if (!cliente) return res.status(404).json('Cliente no encontrado');
    return res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
};

// Listar todos los clientes
const getAllClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find();
    return res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
};

// Editar cliente
const putCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clienteUpdated = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    if (!clienteUpdated) return res.status(404).json('Cliente no encontrado');
    return res.status(200).json(clienteUpdated);
  } catch (error) {
    return next(error);
  }
};

// Borrar cliente
const deleteCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clienteDeleted = await Cliente.findByIdAndDelete(id);
    if (!clienteDeleted) return res.status(404).json('Cliente no encontrado');
    return res.status(200).json('Cliente eliminado');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postCliente,
  getCliente,
  getAllClientes,
  putCliente,
  deleteCliente
};
