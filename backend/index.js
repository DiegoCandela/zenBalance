const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Importado para manejar archivos estáticos
const authRoutes = require('./routes/auth');
const tareaRoutes = require('./routes/tareas');
const recursoRoutes = require('./routes/recursos'); // Importar rutas de recursos

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Configurar la carpeta para archivos cargados
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar rutas de autenticación y tareas
app.use('/api/auth', authRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/recursos', recursoRoutes); // Configurar ruta para recursos

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
