const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Nombre de la base de datos
  process.env.DB_USER,        // Usuario de la base de datos
  process.env.DB_PASSWORD,    // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Dirección del host remoto
    dialect: 'mysql',          // Tipo de base de datos (MySQL)
    port: process.env.DB_PORT, // Puerto (3306 por defecto)
  }
);

// Verificar la conexión
sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((error) => console.error('No se pudo conectar a la base de datos:', error));

module.exports = sequelize;
