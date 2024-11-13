const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, default: null }, // Campo opcional
  personalDescription: { type: String, default: "" }, // Campo opcional
  improvementDescription: { type: String, default: "" } // Campo opcional
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

module.exports = mongoose.model('User', userSchema);
