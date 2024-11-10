const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,  // Asegúrate de que el campo sea obligatorio
  },
  completed: {
    type: Boolean,
    default: false, // Por defecto, la tarea no está completada
  },
});

const Tarea = mongoose.model('Tarea', TareaSchema);

module.exports = Tarea;
