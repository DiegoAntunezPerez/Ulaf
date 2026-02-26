const User = require('../models/User');
const { generateToken } = require('../../utils/token');

// Registro de usuario
const register = async (req, res) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body;
    // Comprobar si existe el usuario 
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    // Crear usuario
    const user = new User({ nombre, email, password, telefono, direccion });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente', user: { nombre, email, telefono, direccion, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    // Genero el JWT usando la función de utils
    const token = generateToken(user._id, user.email, user.rol);
    res.status(200).json({
      message: 'Login correcto',
      user: { nombre: user.nombre, email: user.email, rol: user.rol },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Editar usuario
const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    // No permitir cambiar el email ni el rol desde aquí por seguridad
    delete updateData.email;
    delete updateData.rol;
    const userUpdated = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
    if (!userUpdated) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
};

// Borrar usuario
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  editUser,
  deleteUser
};
