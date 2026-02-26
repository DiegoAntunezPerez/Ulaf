require('dotenv').config(); 
const mongoose = require('mongoose'); 
const fs = require('fs'); 
const path = require('path');  
const csv = require('csv-parser'); // Evito conflitos por comas en la descripcion del csv 
const Articulo = require('../api/models/Articulo');
const Cliente = require('../api/models/Cliente');
const Venta = require('../api/models/Venta');

// Leemos CSV y devolvemos un array de objetos
function readCSV(csvFilePath) {
	return new Promise((resolve, reject) => {
		const results = [];
		fs.createReadStream(csvFilePath)
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', () => resolve(results))
			.on('error', (err) => reject(err));
	});
}

// Convierto precios a €
function parsePrice(value) {
	const raw = String(value ?? '')
		.replace(/\s/g, '')     
		.replace('€', '')       
		.replace(',', '.');     
	const n = Number(raw);
	return Number.isFinite(n) ? n : 0; 
}

// Parseo fechas
function parseDate(value) {
	const raw = String(value ?? '').trim();

	// Le doy formato Iso
	const iso = new Date(raw);
	if (!Number.isNaN(iso.getTime())) return iso;

	// Formato español 
	const parts = raw.split('/');
	if (parts.length === 3) {
		const [dd, mm, yyyy] = parts.map(Number);
		const d = new Date(yyyy, (mm - 1), dd);
		return Number.isNaN(d.getTime()) ? null : d;
	}

	return null 
}

async function seed() {
	let connection;

	try {
		// Leemos los CSV 
		const articulosRaw = await readCSV(path.join(__dirname, 'data/csv/ULAF - Articulos.csv'));
		const clientesRaw = await readCSV(path.join(__dirname, 'data/csv/ULAF - Clientes.csv'));
		const ventasRaw = await readCSV(path.join(__dirname, 'data/csv/ULAF - Ventas.csv'));

		// Transformo artículos mapeandolos
		const articulos = articulosRaw.map(a => ({
			idArticulo: a['ID Articulo'],
			categoria: a['Categoria'],
			marca: a['Marca'],
			nombre: a['Nombre'],
			precio: parsePrice(a['Precio'] ?? a['precio']),
			stock_s: Number(a['stock_s'] || 0),
			stock_m: Number(a['stock_m'] || 0),
			stock_l: Number(a['stock_l'] || 0),
			stock_xl: Number(a['stock_xl'] || 0),
			estado: a['Estado del articulo'],
			imagen: a['Imagen'],
			descripcion: a['Descripcion']
		}));

		// CLientes
		const clientes = clientesRaw.map(c => ({
			idCliente: c['ID cliente'],
			nombre: c['Nombre del cliente'],
			email: c['Email'],
			telefono: c['Telefono'],
			ciudad: c['Ciudad'],
			direccion: c['Direccion']
		}));

		// Ventas
		const ventas = ventasRaw.map(v => ({
			idVenta: v['ID venta'],
			articuloVendido: v['Articulo vendido'],
			clienteAsociado: v['Cliente asociado'],
			fechaVenta: parseDate(v['Fecha de venta']),
			metodoPago: v['Método de pago'] ?? v['Metodo de pago'],
			fechaEntrega: parseDate(v['Fecha de entrega'])
		}));

		// Conexion a Mongo 
		connection = await mongoose.connect(process.env.DB_URL);
		console.log('Conectado a la base de datos');

		// Vaciar datos
		await Articulo.deleteMany({});
		await Cliente.deleteMany({});
		await Venta.deleteMany({});

		// Inserto datos
		await Articulo.insertMany(articulos);
		await Cliente.insertMany(clientes);
		await Venta.insertMany(ventas);

		console.log('Datos insertados correctamente');
	} catch (err) {
		console.error('Error en la seed:', err);
	} finally {
		// Deconectamos BD
		await mongoose.disconnect();
		console.log('Desconectado de la base de datos');
	}
}

seed();

