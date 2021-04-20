const productModel = require('../models/productsModel');


module.exports = {
    home: (req, res) => {
        const products = productModel.readProducts();
        let inSale = [];
        let visited = [];

        // Con el siguiente código, se filtran los productos por categoria. Con límite de max 5 por categoría.

        products.forEach((element, i) => {
            if ( element.state === 'in-sale') {
                if ( inSale.length < 5 ) {
                    inSale.push(element);
                }
            } else if ( element.state === 'visited' ) {
                if ( visited.length < 5 ) {
                    visited.push(element);
                }
            }
        });

        // Con el siguiente código, se filtran los productos por categoria. Sin límite

        // products.forEach(element => {
        //     if ( element.state === 'in-sale') {
        //         inSale.push(element);
        //     } else if ( element.state === 'visited' ) {
        //         visited.push(element)
        //     }
        // });
        // return res.send(visited)
        return res.render('index', { inSale, visited })
    }
};