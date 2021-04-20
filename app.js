const express = require('express');
const app = express();

const productsRoutes = require('./routes/productsRoutes');
const indexRoutes = require('./routes/indexRoutes');

const methodOverride = require('method-override')   
// Requerimos este módulo para asegurar compatibilidad de métodos PUT y DELETE en todos los navegadores.
app.use(methodOverride('_method'))
// Para configurarlo indicamos a app que use este método, con app.use lo empleamos a nivel aplicación.

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/products', productsRoutes);


app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));