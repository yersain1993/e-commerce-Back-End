const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const results = await ProductImg.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const image = await ProductImg.create({ url, publicId: public_id });
    return res.status(201).json(image);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await ProductImg.findByPk(id);
    if(!image) return res.sendStatus(404);
    await deleteFromCloudinary(image.publicId);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}