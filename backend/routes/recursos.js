const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Recurso = require('../models/Recurso');
const authorize = require('../middlewares/authorize');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

// Configuración de almacenamiento y validación de archivos con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'audio/mpeg', 'audio/wav', 'word/docx', 'word/doc', 'pdf/pdf', 'audio/mp3',];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo imágenes, videos y audios están permitidos.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Límite de 10 MB
});

// Ruta para obtener todos los recursos
router.get('/', authorize, async (req, res) => {
  try {
    const recursos = await Recurso.find();
    res.status(200).json(recursos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los recursos', error });
  }
});

// Ruta para crear un recurso
router.post('/', authorizeAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validación de datos
    if (!title || !description) {
      return res.status(400).json({ message: 'El título y la descripción son obligatorios.' });
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newRecurso = new Recurso({
      title,
      description,
      fileUrl,
    });

    await newRecurso.save();
    res.status(201).json(newRecurso);
  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ message: 'Error al crear el recurso', error });
  }
});

// Ruta para eliminar un recurso
router.delete('/:id', authorizeAdmin, async (req, res) => {
  try {
    const recurso = await Recurso.findById(req.params.id);
    if (!recurso) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }

    // Eliminar el archivo asociado si existe
    if (recurso.fileUrl) {
      const filePath = path.join(__dirname, '..', recurso.fileUrl);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('Archivo eliminado:', filePath);
        }
      } catch (err) {
        console.error('Error al eliminar el archivo:', err);
      }
    }

    // Eliminar el recurso de la base de datos
    await Recurso.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Recurso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el recurso:', error);
    res.status(500).json({ message: 'Error al eliminar el recurso', error });
  }
});

// Manejo de errores en multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: `Error en la subida de archivo: ${err.message}` });
  } else if (err) {
    res.status(400).json({ message: `Error: ${err.message}` });
  } else {
    next();
  }
});

module.exports = router;
