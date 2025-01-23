

const s3 = require('../config/s3Client')
const ImagesPromise = require('../models/images');

const getItems = (req, res) => {
    res.json([]);
};

const createItem = (req, res) => {
    const newItem = req.body;
    res.status(201).json({ message: 'Item creado', data: newItem });
};

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha enviado ningún archivo' });
        }

        const fileName = `${Date.now()}-${req.file.originalname.split(' ').join('-')}`;
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
        //subir a s3
        await s3.putObject(params).promise();
        const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName.split(' ').join('-')}`;

        // const Images = await ImagesPromise;

        // const newImage = await Images.create({
        //     image: fileUrl, // URL de la imagen o el path
        //  });

        res.status(200).json({
            message: 'Archivo subido con éxito',
            fileUrl,
        //    image: newImage,
        });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error al subir archivo' });
    }
};

module.exports = {
    getItems,
    createItem,
    uploadFile,
};
