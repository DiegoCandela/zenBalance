const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, default: null }, // Campo opcional
  personalDescription: { type: String, default: "" }, // Campo opcional
  improvementDescription: { type: String, default: "" }, // Campo opcional
  role: { type: String, enum: ['admin', 'user'], default: 'user' } // Campo para roles
});

// Middleware para encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Método para verificar si el usuario tiene un rol específico
userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

module.exports = mongoose.model('User', userSchema);
