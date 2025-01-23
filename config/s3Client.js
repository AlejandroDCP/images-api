
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region: process.env.AWS_REGION
});

const params = {
  Bucket: 'cadu-dev-postventa',
};

s3.getObject(params, (err, data) => {
  if (err) {
    console.error('Error al acceder a S3:', err);
  } else {
    console.log('Archivo recuperado:', data.Body.toString());
  }
});

module.exports = s3;
