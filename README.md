# node-express-basic-mvc-structure
Estructura inicial de proyecto con node y express, utilizando patrón de diseño MVC. 

## **Creación rápida de estructura básica MVC en NodeJs con Express**

### **Preparando proyecto**
1. Dentro de nuestra carpeta / proyecto crearemos un archivo **app.js**.
2. Desde líneas de comando nos situamos en la carpeta / proyecto e inicializamos un proyecto con ***npm init -y***
~~~
npm init -y
~~~
3. También desde líneas de comando instalamos express con ***npm i express***
~~~
npm i express
~~~
4. Instalamos nodemon con ***npm i nodemon --save-dev***
~~~
npm i nodemon --save-dev
~~~
5. Abrimos el archivo *package.json*, que se nos creó en el raíz de nuestro proyecto, y agregamos al objeto JSON **"Scripts"** las propiedades: **"start": "node app.js"** y **"startdev": "nodemon app.js"**. Y nos quedará así: 
~~~
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "startDev": "nodemon app.js"
  },
~~~
6. Vamos a necesitar ignorar la carpeta node_modules para que esta no se cargue al repositorio remoto en Github: Creamos un archivo **.gitignore** en el raíz del proyecto y dentro del archivo agregamos una línea con el nombre de la carpeta que queremos omitir, **node_modules**.

### **Estructura de archivos y carpetas**
Vamos a crear una estructura completa de carpetas y luego agregaremos cada archivo según vamos necesitando.
En el raíz del proyecto creamos las siguientes carpetas:
- controllers
- data
- models
- public
- routes
- views

### **Iniciando servidor**
1. En nuestro entry point *"appjs"* vamos a requerir express
~~~
const express = require('express');
~~~
2. Ejecutamos express y guardamos el resultado en una constante *app*
~~~
const app = express();
~~~
#### Ahora con la constante *"app"* vamos a utilizar métodos para indicar a express comportamientos y acciones
3. Indicamos a express que vamos a usar la carpeta *"public"* de l raíz para alojar todos los archivos de acceso público. Ej: carpetas y archivos **css\style.css** y **js\script.js**
~~~
app.use(express.static('public'));
~~~

4. Indicamos a express que vamos a escuchar en el puerto **3000** las peticiones.
~~~
app.listen(3000, ()=> { 
    console.log("Servidor escuchando en puerto 3000") 
});
~~~
*Estamos además pasando un callback para mostrar en consola que el servicio ya esta corriendo y escuchando el puerto 3000*

5. Vamos a atajar y responder a una petición por *get*
~~~
app.get('/', (req, res) => res.send("Home Works"));
~~~

6. Probamos nuestro servidor funciona. Desde terminal ejecutamos ***npm run startdev*** y deberíamos ver en consola el mensaje que incluimos antes ***Servidor escuchando en puerto 3000***.
~~~
npm run startdev
~~~

7. Probamos responde a las peticiones, para esto abrimos un navegador y escribimos en la barra de direcciones ***localhost:3000*** ó en línea de comando 
~~~
start http://localhost:3000
~~~

### **Rutas**
Para crear rutas, inicialmente, vamos a crearlas dentro del mismo app.js
- Escuchando "***/products***"
~~~
app.get('/products', (req, res) => {
    res.send("Listado de productos");
});
~~~
- Escuchando "***/products/1***", donde obtendremos el detalle de un producto pasando el ID del mismo como parámetro en la ruta. "***/products/id***".
~~~
app.get('/products/:id', (req, res) => {
    res.send("Detalle del producto " + req.params.id );
});
~~~

### **Modularizar**
Vamos a separar del entry point cada ruta, agrupando por tipo de petición. Separemos todas las peticiones que lleguen de las rutas '/products' en un archivo de ruteo en la carpeta routes.

- Creamos el archivo 'routes/productsRoutes.js' y dentro 
  1. Requerimos express y guardamos en constante router la ejecución del método Router() de express.
  ~~~
    const express = require('express');
    const router = express.Router();
  ~~~
  2. Mediante este archivo *productsRoutes.js* vamos a atender las peticiones que lleguen a '/products' y por dentro de este archivo debemos indicar que rutas de '/products' vamos a responder. Entonces, si teníamos antes en app.js que respondíamos a '/products/' y '/products/:id'; aquí vamos a indicar 
   ~~~
    router.get('/', (req, res) => res.send('Listado de productos'));
    router.get('/:id', (req, res) => res.send('Detalle del producto ' + req.params.id));
   
    module.exports = router;
   ~~~
   *con **module.export = router** exportamos las rutas antes indicadas y ahora podemos importar esto en app.js para indicar que las peticiones de rutas '/products' sean manejadas por estas rutas*

- Indiquemos en app.js las rutas para '/products', para esto 
    1. Requerimos el archivo *productsRoutes.js*
    ~~~
    const productsRoutes = require('./routes/productsRoutes');
    ~~~   
    2. Ahora quitamos las líneas de rutas antes creadas en app.js e indicamos a express que para la ruta '/products' use la constante productsRoutes que posee las rutas exportadas en el archivo requerido.
    ~~~
    app.use('/products', productsRoutes);
    ~~~

### **Controladores**

1. Vamos a modularizar la lógica de cada ruta. Creamos ***'controllers/productsController.js'***
2. Lo requerimos dentro del ruteo de ***productsRoutes.js***
    ~~~
    const controller = require('../controllers/productsController');
    ~~~
3. Quitamos la lógica (respuesta) a cada petición, que tenemos dentro del ruteo, lo llevamos y lo exportamos en ***'productsController.js'***
    - En ***productsController.js***
    ~~~
    module.exports = {
        index: (req, res) => {
            res.send('Listado de productos');
        },
        detail: (req, res) => {
            res.send('Detalle del producto ' + req.params.id');
        }
    };
    ~~~
    ***Creamos y exportamos un objeto literal con dos métodos, uno para cada ruta***
    - En ***productsRoutes.js*** donde ya importamos antes el controlador, modificamos las rutas para que nos queden de la siguiente manera.
    ~~~
    router.get('/', controller.index);
    router.get('/:id', controller.detail);
    ~~~
    ***Donde para cada ruta usamos la constante controller e indicamos que método utilizar para cada ruta.***


### **Observaciones**:

- No hicimos uso de las demás carpetas. Lo único que hicimos es crear respuesta a algunas rutas donde modularizamos el ruteo y controlador para estas. La idea es modularizar y separar código y responsabilidades para cada parte.
- Es importante tener presente que el controlador es quien va a comunicarse con **modelo** y con **vista**. Es decir que desde el controlador es donde vamos a requerir a **modelo**, solicitando los datos a cada petición y luego enviar a renderizar la vista correcta compartiendo con **vista** los datos correspondientes. Algo que se dejará ver mejor cuando se aplique base de datos y algún motor de renderizado.
- En la carpeta **public** vamos a almacenar css, js, imágenes, iconos, fuentes y todos los recursos públicos que pueda necesitar el navegador para renderizar las vistas como lo indica **vista**.
- Las peticiones de recursos públicos, que le indicamos a express la carpeta a utilizar, no llegan a **controlador**, **modelo** y **vista**. Por lo que no se consideran peticiones al servidor que atienda el modelo MVC.
- No todas las peticiones *no públicas* que sean atendidas por **controlador** requieren datos que pedir a **modelo**. Por lo que es importante destacar que la comunicación **vista** <- **controlador** <-> **modelo** indicada antes, no es un circuito que se deba cumplir y es un esquema a respetar donde sólo el **controlador** es quien se comunica con **modelo** y con **vista**.
- Como se indicó, las responsabilidades y comunicación de **modelo**, **vista** y **controlador** no es algo que podamos "decirle" que se deba respetar; es un esquema que debemos respetar nosotros al escribir nuestro código y al modularizar. Por lo que es fundamental mantener orden y coherencia en la estructura para que tenga sentido la modularización.


***Nota***: En el código del repositorio se encuentra una versión mas completa con ejemplo simple utilizando **'/views'**, **'/models'**, **'/public'** y **'/data'**. Que intenta mostrar mejór como el controlador se comunica con **Modelo** para obtener los datos antes de responder.