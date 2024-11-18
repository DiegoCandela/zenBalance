// routes/recursos.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Recurso = require('../models/Recurso');
const authorize = require('../middlewares/authorize'); // Permite a todos los usuarios autenticados
const authorizeAdmin = require('../middlewares/authorizeAdmin'); // Solo para administradores

// Configuración de almacenamiento de `multer`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo basado en timestamp
  },
});
const upload = multer({ storage: storage });

// Ruta para obtener todos los recursos (accesible para todos los usuarios autenticados)
router.get('/', authorize, async (req, res) => {
  try {
    const recursos = await Recurso.find();
    res.status(200).json(recursos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los recursos', error });
  }
});

// Ruta para crear un recurso (solo accesible para administradores)
router.post('/', authorizeAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null; // URL del archivo

    const newRecurso = new Recurso({
      title,
      description,
      fileUrl,
    });

    await newRecurso.save();
    res.status(201).json(newRecurso);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el recurso', error });
  }
});

// Ruta para eliminar un recurso (solo accesible para administradores)
router.delete('/:id', authorizeAdmin, async (req, res) => {
  try {
    const recurso = await Recurso.findById(req.params.id);
    if (!recurso) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }

    // Verificar si el archivo existe antes de intentar eliminarlo
    if (recurso.fileUrl) {
      const filePath = path.join(__dirname, '..', recurso.fileUrl);
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          // Si el archivo existe, intenta eliminarlo
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo:', err);
            } else {
              console.log('Archivo eliminado:', recurso.fileUrl);
            }
          });
        } else {
          console.warn('Archivo no encontrado:', recurso.fileUrl);
        }
      });
    }

    // Eliminar el recurso de la base de datos
    await Recurso.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Recurso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el recurso:', error);
    res.status(500).json({ message: 'Error al eliminar el recurso', error });
  }
});

module.exports = router;
