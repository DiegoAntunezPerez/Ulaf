const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json('No autorizado: usuario no autenticado');
    }
    if (req.user.rol !== 'admin') {
      return res.status(403).json('Acceso denegado: no eres administrador');
    }
    next();
  } catch (error) {
    console.error('Error en isAdmin:', error);
    return res.status(403).json('Acceso denegado');
  }
};

module.exports = { isAdmin };
