const User = require('../api/models/User');
const { verifyToken } = require('../utils/token');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json('No autorizado');
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json('Usuario no encontrado o inválido');
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error en isAuth:', error);
    return res.status(401).json('No autorizado');
  }
};

module.exports = { isAuth };
