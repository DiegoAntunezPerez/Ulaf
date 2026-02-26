const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('conectado a la DB')
  } catch (error) {
    console.log('Error en la conexión a la DB')
    console.error(error.message)
  }
}
module.exports = { connectDB }
