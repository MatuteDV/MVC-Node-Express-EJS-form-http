const fs = require('fs');

module.exports = {
    getProductList: () => {
        const jsonProducts = fs.readFileSync(__dirname + '/../data/products.json');
        const products = JSON.parse(jsonProducts);
        const resumeProductsList = products.map( product => { 
            return {id: product.id, name: product.name, category: product.category} 
        });
        
        return resumeProductsList;
    },
    getProductDetail: (id) => {
        const jsonProducts = fs.readFileSync(__dirname + '/../data/products.json');
        const products = JSON.parse(jsonProducts);
        const response = products.find( product => product.id == id);
        return response ? response : {};
    },
    readProducts: () => {
        const jsonProducts = fs.readFileSync(__dirname + '/../data/products.json');
        const products = JSON.parse(jsonProducts);
        return products
    },
    writeProducts: (products) => {
        const productJSON = JSON.stringify(products, null, 2);
        fs.writeFileSync(__dirname + '/../data/products.json', productJSON, 'utf-8');
        return true;
    }
};