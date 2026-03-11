const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { connectDB } = require('./src/config/db');
const { connectCloudinary } = require('./src/config/cloudinary');
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares básicos
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
const userRoutes = require('./src/api/routes/user');
const articuloRoutes = require('./src/api/routes/articulo');
const clienteRoutes = require('./src/api/routes/cliente');
const ventaRoutes = require('./src/api/routes/venta');
app.use('/api/users', userRoutes);
app.use('/api/articulos', articuloRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/ventas', ventaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
	res.send('API funcionando');
});

// Manejo de errores 
app.use((err, req, res, next) => {
	console.error('Error global:', err);
	const status = err.status || 500;
	const message = err.message || 'Error interno del servidor';
	res.status(status).json({ error: message });
});

// Conecta y arranca el servidor 
connectDB().then(() => {
	connectCloudinary();
	app.listen(PORT, () => {
		console.log(`Servidor escuchando en puerto ${PORT}`);
	});
});
