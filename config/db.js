const { Sequelize } = require('sequelize');
const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager();

const getDatabaseCredentials = async () => {
  const secretName = process.env.SECRET_ARN;
  
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    return JSON.parse(data.SecretString);
  
  } catch (error) {
    throw new Error('No se pudieron obtener las credenciales de la base de datos.');
  }
  
};

const createSequelizeInstance = async () => {
  try {
    const { username, password, host, port, dbname } = await getDatabaseCredentials();
    return new Sequelize(dbname, username, password, {
      host,
      dialect: 'mysql',
      port,
    });
  } catch (error) {
    console.error('Error al crear la instancia de Sequelize:', error.message);
    throw error;
  }
};

module.exports = createSequelizeInstance();
