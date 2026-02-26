const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  idCliente: String,
  nombre: String,
  email: String,
  telefono: String,
  ciudad: String,
  direccion: String
});

module.exports = mongoose.model('Cliente', clienteSchema);
