// middlewares/authorize.js
const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Autorización requerida' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjunta el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token no válido' });
  }
}

module.exports = authorize;
