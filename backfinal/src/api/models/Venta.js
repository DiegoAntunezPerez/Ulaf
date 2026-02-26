const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  idVenta: String,
  articuloVendido: String,
  clienteAsociado: String,
  fechaVenta: Date,
  metodoPago: String,
  fechaEntrega: Date
});

module.exports = mongoose.model('Venta', ventaSchema);
