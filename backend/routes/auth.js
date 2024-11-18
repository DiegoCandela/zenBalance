// src/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    req.user = decoded; 
    next();
  });
};

// Middleware para verificar roles
const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: 'Token no válido o no proporcionado.' });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: `Acceso denegado: se requiere el rol de ${requiredRole}` });
    }
    next();
  };
};

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Incluye el rol en el token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Login exitoso', 
      token, 
      user: { name: user.username, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está en uso.' });
    }

    // Crear un nuevo usuario con el rol especificado (por defecto, "user")
    const newUser = new User({ 
      username, 
      email, 
      password, 
      role: role || 'user' 
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', verifyToken, async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId).select('username age personalDescription improvementDescription role');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error });
  }
});

// Ruta para actualizar información adicional del usuario
router.put('/update-profile', verifyToken, async (req, res) => {
  const { userId } = req.user;
  const { age, personalDescription, improvementDescription } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { age, personalDescription, improvementDescription },
      { new: true }
    );

    res.json({ message: 'Perfil actualizado con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta de ejemplo protegida por rol de administrador
router.get('/admin', verifyToken, verifyRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Acceso concedido al administrador' });
});

module.exports = router;
