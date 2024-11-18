const jwt = require('jsonwebtoken');

function authorizeAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Autorización requerida' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador' });
    }
    req.user = decoded; // Adjunta el usuario decodificado a la solicitud
    next(); // Llama a la siguiente función middleware en la ruta
  } catch (error) {
    res.status(403).json({ message: 'Token no válido' });
  }
}

module.exports = authorizeAdmin;
