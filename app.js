const express = require('express');
const app = express();

// Rutas
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Index'));

app.get('/products', (req, res) => {
    res.send('Productos');
});

app.get('/products/:id', (req, res) => {
    res.send("Producto: " + req.params.id);
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));