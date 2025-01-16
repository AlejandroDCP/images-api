const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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

module.exports = Images;
