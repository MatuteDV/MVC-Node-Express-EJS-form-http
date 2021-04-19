const fs = require('fs');

module.exports = {
    getProductList: () => {
        const jsonProducts = fs.readFileSync(__dirname + '/../data/products.json');
        const products = JSON.parse(jsonProducts);
        const resumeProductsList = products.map( product => { 
            return {id: product.id, name: product.name} 
        });
        
        return resumeProductsList;
    },
    getProductDetail: (id) => {
        const jsonProducts = fs.readFileSync(__dirname + '/../data/products.json');
        const products = JSON.parse(jsonProducts);
        const response = products.find( product => product.id == id);
        return response ? response : {};
    }
};