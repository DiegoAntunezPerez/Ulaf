const mongoose = require('mongoose');

const ArticuloSchema = new mongoose.Schema({
  idArticulo: { type: String, required: true, unique: true, trim: true },
  categoria: { type: String, required: true, trim: true },
  marca: { type: String, required: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  stock_s: { type: Number, required: true, min: 0 },
  stock_m: { type: Number, required: true, min: 0 },
  stock_l: { type: Number, required: true, min: 0 },
  stock_xl: { type: Number, required: true, min: 0 },
  estado: { type: String, required: true, trim: true },
  imagen: { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true, maxlength: 500 }
});

module.exports = mongoose.model('Articulo', ArticuloSchema);