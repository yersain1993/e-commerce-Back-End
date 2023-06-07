const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('productImg', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publicId: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = ProductImg;