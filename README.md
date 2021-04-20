# Ejemplo para CRUD con MVC - Node - express - fs - JSON - method-override - EJS

### **Preparando proyecto**
1. Desde líneas de comando instalamos las dependencias ***npm i ***
~~~
npm i
~~~
2. Instalamos nodemon con ***npm i nodemon --save-dev***
~~~
npm i nodemon --save-dev
~~~
3. Abrimos el archivo *package.json*, en el raíz de nuestro proyecto, y agregamos al objeto JSON **"Scripts"** las propiedades: **"start": "node app.js"** y **"startdev": "nodemon app.js"**. Y nos quedará así: 
~~~
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "startDev": "nodemon app.js"
  },
~~~
4. Para levantar el servidor, en líneas de comando, iniciamos con ***npm run startdev***
~~~
npm run startdev
~~~
