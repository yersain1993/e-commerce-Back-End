const { getAll, create, remove } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');

const productImgRouter = express.Router();

productImgRouter.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

productImgRouter.route('/:id')
    .delete(remove)

module.exports = productImgRouter;