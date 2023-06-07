const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [{
            model: Product,
            include: [ProductImg]
        }],
        where: {userId: req.user.id}
    });
    return res.json(results);
});

module.exports = {
    getAll
}