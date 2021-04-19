const productModel = require('../models/productsModel');

module.exports = {
    index: (req, res) => {
        const products = productModel.getProductList();
        return res.render('products', { products })
    },
    detail: (req, res) => {
        const id = req.params.id;
        const product = productModel.getProductDetail(id);
        return res.render( 'productDetail', { product })
    },
    create: (req, res) => {
        return res.render('create');
    },
    store: (req, res) => {
        const body = req.body;
        return res.send(body);
    }
};