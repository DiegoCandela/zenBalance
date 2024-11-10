const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// Crear una tarea
router.post('/', async (req, res) => {
  try {
    const { task, completed } = req.body;
    const newTarea = new Tarea({ task, completed });
    await newTarea.save();
    res.status(201).json(newTarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.status(200).json(tareas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener una tarea por ID
router.get('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
