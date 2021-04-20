const productModel = require('../models/productsModel');


module.exports = {
    list: (req, res) => {
        const products = productModel.getProductList();     // Solicitamos al modelo el listado de productos.
        return res.render('index', { products })
    },
    search: (req, res) => {
        const query = req.query;                                        // Capturamos el query
        const querySearch = query.search.toLowerCase();                 // separamos la propiedad name del query
        const products = productModel.getProductList();                 // traemos del modelo los productos
        const filteredProducts = products.filter( product => {          // filtramos los que coincidan con la busqueda en una nueva constante filteredProducts
            const productName = product.name.toLowerCase();             // cada name lo convertimos a minuscula, lo guardamos aparte para no pisar el nombre real
            return productName.indexOf(querySearch) !== -1;             // retornamos evaluación de buscar en productName el string de busqueda, si es true la comparación
        });                                                             // se retorna true y por no se filtra ese elemento.
        return res.render('products', { products: filteredProducts });  // Compartimos con la vista de products, pero con la lista filtrada. 
    },
    list: (req, res) => {
        const products = productModel.getProductList();
        return res.render('products', { products })
    },
    detail: (req, res) => {
        const id = req.params.id;
        const product = productModel.getProductDetail(id);  // Le pedimos al modelo el detalle de un producto, le pasamos el ID para buscarlo. 
        return res.render( 'productDetail', { product })
    },
    destroy: (req, res) => {
        const id = Number(req.params.id);                                           // Capturamos el ID que se quiere eliminar desde req.params.id, lo convertimos a Number y lo guardamos en id
        const products = productModel.readProducts();                             // Traemos todos los productos
        const newArrayProducts = products.filter( product => product.id !== id);    // filtramos el que sea el mismo ID, lo que es lo mismo que crear un nuevo array con todos menos el id a eliminar
        const isDeleted = productModel.writeProducts(newArrayProducts);          // Escribimos nuevamente el archivo. Le pedimos a (modelo) que escriba el archivo.

        
        if ( isDeleted ) return res.redirect('/products/');                         // Si se borró, redirijo a listado (/products/)
        return res.send('Error inesperado al eliminar el producto');                // Si no se borró, muestro error inesperado
    },
    create: (req, res) => {
        return res.render('create');
    },
    store: (req, res) => {
        const body = req.body;
        let products = productModel.readProducts();
        const maxIdProduct = products.reduce( (curr, next) => curr.id >= next.id ? curr : next );
        const newProduct = {
            id: maxIdProduct.id + 1,
            name: body.name,
            brand: body.brand,
            price: Number(body.price)
            // Completar resto de propiedades para que todos los productos queden iguales. 
        }
        products.push(newProduct);
        const isCreated = productModel.writeProducts(products);

        if ( isCreated ) return res.redirect('/products/');                         // Si se cre'o, redirijo a listado (/products/)
        return res.send('Error inesperado al eliminar el producto');                // Si no se borró, muestro error inesperado
    },
    edit: (req, res) => {
        const id = Number(req.params.id);
        const product = productModel.getProductDetail(id);
        return res.render('edit', { product });
    },
    update: (req, res) => {
        const body = req.body;
        const id = Number(body.id);
        let products = productModel.readProducts();
        products.forEach(product => {
            if ( product.id === id ){
                product.name = body.name;
                product.brand = body.brand;
                product.price = Number(product.price);
                // Completar resto de propiedades para que todos los productos queden iguales. 
            }
        });
        const isEdited = productModel.writeProducts(products);
        if ( isEdited ) return res.redirect('/products/'+ id);                         // Si se cre'o, redirijo a listado (/products/:id)
        return res.send('Error inesperado al eliminar el producto');                // Si no se borró, muestro error inesperado
    }
};