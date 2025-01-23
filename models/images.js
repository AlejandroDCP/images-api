const { DataTypes } = require('sequelize');
const sequelizePromise = require('../config/db');

const ImagesPromise = sequelizePromise.then(async (sequelize) => {
  const Images = sequelize.define('images', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  await sequelize.sync();
  console.log('Modelo Images sincronizado correctamente.');
  return Images;
}).catch((error) => {
  console.error('Error al inicializar el modelo Images:', error.message);
  process.exit(1);
});

module.exports = ImagesPromise;
