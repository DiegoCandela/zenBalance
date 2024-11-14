// Tarea.js
const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Tarea = mongoose.model('Tarea', TareaSchema);

module.exports = Tarea;
