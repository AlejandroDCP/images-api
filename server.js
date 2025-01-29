require('dotenv').config();

const imagesService = require('./routes/images');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const path = require('path');
const app = express();

const configureMiddlewares = () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'upload-image', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload-image', 'dist', 'index.html'));
  });
};

const configureRoutes = () => {
  app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API!');
  });

  app.use('/images', imagesService);
};

const initializeDatabase = async () => {
  try {
    const sequelizeInstance = await sequelize;

    await sequelizeInstance.authenticate();
    console.log('Conexión exitosa a la base de datos.');

    await sequelizeInstance.sync({ force: false });
    console.log('Modelos sincronizados.');

    return sequelizeInstance;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw new Error('No se pudo conectar a la base de datos.');
  }
};

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};

const startApp = async () => {
  try {
    configureMiddlewares();
    configureRoutes();

    await initializeDatabase();

    const port = process.env.PORT || 3000;
    startServer(port);
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

startApp();

//test deploy
