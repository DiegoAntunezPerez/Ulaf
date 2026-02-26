const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, match: /.+@.+\..+/ },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  telefono: { type: String, trim: true },
  direccion: { type: String, trim: true },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' },
  foto: { type: String, trim: true }, // URL de Cloudinary
  fotoId: { type: String, trim: true }, // ID de Cloudinary para borrar la imagen
}, {
  timestamps: true
});

// Hasheo contraseña antes de guardar
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparo la contraseña 
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
