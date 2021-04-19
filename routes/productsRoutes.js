const express = require('express');
const router = express.Router();

// --- Código sin modularizar controlador

router.get('/', (req, res) => {                 //  ------   (*) Atendemos a '/products' + '/'      --> '/products/'
    res.send('Productos');
});

router.get('/:id', (req, res) => {              //  ------   (*) Atendemos a '/products' + '/:id'   --> '/products/:id'
    res.send("Producto: " + req.params.id);
});

module.exports = router;