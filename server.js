require('dotenv').config(); 

const imagesService = require('./routes/images');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db'); 
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'upload-image', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload-image', 'dist', 'index.html'));
});

// Probar conexión y sincronizar modelos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    return sequelize.sync({ force: false }); // Sincronizar modelos con la base de datos
  })
  .then(() => {
    console.log('Modelos sincronizados');
  })
  .catch((error) => {
    console.error('Error al conectar o sincronizar la base de datos:', error);
  });

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API!');
});

app.use('/images', imagesService);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});
