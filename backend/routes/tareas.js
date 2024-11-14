// tareas.js
const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');
const verifyToken = require('../middlewares/verifyToken'); // Middleware de autenticación

// Crear una tarea para el usuario autenticado
router.post('/', verifyToken, async (req, res) => {
  try {
    const { task } = req.body;
    const newTarea = new Tarea({ task, userId: req.user.userId }); // Asocia la tarea al usuario
    await newTarea.save();
    res.status(201).json(newTarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las tareas del usuario autenticado
router.get('/', verifyToken, async (req, res) => {
  try {
    const tareas = await Tarea.find({ userId: req.user.userId }); // Filtra por userId
    res.status(200).json(tareas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una tarea del usuario autenticado
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId }, // Asegura que el usuario solo actualice sus tareas
      req.body,
      { new: true }
    );
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una tarea del usuario autenticado
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
