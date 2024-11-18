// models/Recurso.js
const mongoose = require('mongoose');

const RecursoSchema = new mongoose.Schema({
  title: { type: String, required: true },          // Título del recurso
  description: { type: String },                     // Descripción del recurso
  fileUrl: { type: String },                         // URL del archivo cargado
  createdAt: { type: Date, default: Date.now }       // Fecha de creación
});

module.exports = mongoose.model('Recurso', RecursoSchema);
