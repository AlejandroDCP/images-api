const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getItems, createItem, uploadFile } = require('../controllers/images');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getItems);
router.delete('/', createItem);
router.post('/upload', upload.single('image'), uploadFile);

module.exports = router;
